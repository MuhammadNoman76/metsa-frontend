"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  X,
  Maximize2,
  Minimize2,
  FileText,
  AlertCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
} from "lucide-react";
import api from "@/lib/api";
import mammoth from "mammoth";
import * as XLSX from "xlsx";
// import { useToast } from "@/contexts/ToastContext";

// Dynamic import of react-pdf components with no SSR
const Document = dynamic(
  () => import("react-pdf").then((mod) => mod.Document),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
      </div>
    ),
  }
);

const Page = dynamic(() => import("react-pdf").then((mod) => mod.Page), {
  ssr: false,
});

// Import pdfjs and configure worker
import("react-pdf").then((pdf) => {
  const { pdfjs } = pdf;
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
});

// Import styles
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentId: string;
  documentTitle: string;
  fileName: string;
  mimeType?: string;
  canDownload?: boolean;
}

export default function DocumentPreviewModal({
  isOpen,
  onClose,
  documentId,
  documentTitle,
  fileName,
  mimeType,
}: DocumentPreviewModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  // const toast = useToast();
  const [convertedContent, setConvertedContent] = useState<string | null>(null);
  const [excelData, setExcelData] = useState<{
    html: string;
    sheetNames: string[];
    currentSheet: string;
  } | null>(null);

  // PDF specific states
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const pdfContainerRef = useRef<HTMLDivElement | null>(null);

  // Get file extension and type
  const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";
  const isPDF = fileExtension === "pdf" || mimeType?.includes("pdf");
  const isWord = ["doc", "docx"].includes(fileExtension);
  const isExcel = ["xls", "xlsx"].includes(fileExtension);

  useEffect(() => {
    if (isOpen && documentId) {
      loadPreview();
    }
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, documentId]);

  // Calculate optimal scale responsive to container width
  useEffect(() => {
    const calculateScale = () => {
      if (typeof window !== "undefined") {
        const isMobile = window.innerWidth <= 768;
        const measuredWidth = pdfContainerRef.current?.clientWidth;
        const fallbackWidth = isMobile
          ? window.innerWidth - 16
          : Math.min(window.innerWidth * 0.8, 1200);
        const containerWidth = Math.max(0, measuredWidth ?? fallbackWidth);

        // Standard PDF width is 612 points
        const optimalScale = containerWidth / 612;

        setScale(
          isMobile ? Math.min(optimalScale, 1.0) : Math.min(optimalScale, 1.5)
        );
      }
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, [isOpen, isFullscreen]);

  const loadPreview = async () => {
    setLoading(true);
    setError(null);
    setPdfError(null);
    setConvertedContent(null);
    setExcelData(null);
    setPdfBlob(null);
    setCurrentPage(1);
    setRotation(0);

    try {
      const response = await api.get(`/documents/${documentId}/preview`, {
        responseType: "blob",
      });

      const serverType =
        (response.headers && (response.headers["content-type"] as string)) ||
        mimeType ||
        "application/octet-stream";

      const effectiveType =
        serverType === "application/octet-stream" && isPDF
          ? "application/pdf"
          : serverType;

      const blob = new Blob([response.data], { type: effectiveType });

      if (isPDF) {
        setPdfBlob(blob);
      } else {
        const url = URL.createObjectURL(blob);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(url);

        if (isWord) {
          await convertWordDocument(blob);
        } else if (isExcel) {
          await convertExcelDocument(blob);
        }
      }
    } catch (err: unknown) {
      console.error("Error loading preview:", err);
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Unable to load document preview. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const convertWordDocument = async (blob: Blob) => {
    try {
      const arrayBuffer = await blob.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setConvertedContent(result.value);
    } catch (err) {
      console.error("Error converting Word document:", err);
      setError("Unable to convert Word document for preview.");
    }
  };

  const convertExcelDocument = async (blob: Blob) => {
    try {
      const arrayBuffer = await blob.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const htmlString = XLSX.utils.sheet_to_html(worksheet);

      setExcelData({
        html: htmlString,
        sheetNames: workbook.SheetNames,
        currentSheet: firstSheetName,
      });
    } catch (err) {
      console.error("Error converting Excel document:", err);
      setError("Unable to convert Excel document for preview.");
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setCurrentPage(1);
    setPdfError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("PDF load error:", error);
    setPdfError(
      "Failed to load PDF. The file may be corrupted or unsupported."
    );
  };

  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(1, prev - 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(numPages, prev + 1));
  const zoomIn = () => setScale((prev) => Math.min(2.5, prev + 0.25));
  const zoomOut = () => setScale((prev) => Math.max(0.5, prev - 0.25));
  const rotate = () => setRotation((prev) => (prev + 90) % 360);

  const renderPDFPreview = () => {
    if (!pdfBlob) return null;

    if (pdfError) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center space-y-4 max-w-md">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              PDF Preview Error
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{pdfError}</p>
            <button
              onClick={loadPreview}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
        {/* PDF Controls - sticky, with mobile Close */}
        <div
          className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20"
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage <= 1}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[80px] text-center">
              {currentPage} / {numPages || "?"}
            </span>

            <button
              onClick={goToNextPage}
              disabled={currentPage >= numPages}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop tools */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={zoomOut}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>

            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[60px] text-center">
              {Math.round(scale * 100)}%
            </span>

            <button
              onClick={zoomIn}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-5 h-5" />
            </button>

            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

            <button
              onClick={rotate}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Rotate"
            >
              <RotateCw className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Close button inside controls */}
          <button
            onClick={onClose}
            className="sm:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close preview"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PDF Document */}
        <div className="flex-1 overflow-auto p-2 sm:p-4">
          <div
            ref={pdfContainerRef}
            className="flex justify-center w-full overflow-x-hidden"
          >
            <Document
              file={pdfBlob}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
                </div>
              }
              error={
                <div className="flex flex-col items-center justify-center p-8">
                  <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Failed to load PDF
                  </p>
                  <button
                    onClick={loadPreview}
                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Retry
                  </button>
                </div>
              }
              className="flex justify-center"
            >
              <Page
                pageNumber={currentPage}
                scale={scale}
                rotate={rotation}
                className="shadow-lg max-w-full"
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            </Document>
          </div>
        </div>

        {/* Mobile-friendly page navigation (bottom) */}
        {numPages > 1 && (
          <div
            className="sm:hidden p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div className="flex items-center justify-between">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage <= 1}
                className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
              >
                Previous
              </button>

              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Page {currentPage} of {numPages}
              </span>

              <button
                onClick={goToNextPage}
                disabled={currentPage >= numPages}
                className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderPreviewContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin mx-auto" />
            <p className="text-gray-600 dark:text-gray-400">
              Loading preview...
            </p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center space-y-4 max-w-md px-4">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Preview Error
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
            <button
              onClick={loadPreview}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    if (isPDF) return renderPDFPreview();

    // Word documents
    if (isWord && convertedContent) {
      return (
        <div className="w-full h-full flex flex-col p-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Word Document Preview
              </span>
            </div>
          </div>
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg overflow-auto border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div
              className="prose prose-sm max-w-none dark:prose-invert word-preview"
              dangerouslySetInnerHTML={{ __html: convertedContent }}
            />
          </div>
        </div>
      );
    }

    // Excel documents
    if (isExcel && excelData) {
      return (
        <div className="w-full h-full flex flex-col p-4">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                Excel Spreadsheet Preview
              </span>
            </div>
          </div>
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg overflow-auto border border-gray-200 dark:border-gray-700 p-4">
            <div
              className="excel-preview"
              dangerouslySetInnerHTML={{ __html: excelData.html }}
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: "14px",
              }}
            />
          </div>
        </div>
      );
    }

    // Fallback
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <FileText className="w-12 h-12 text-gray-400 mx-auto" />
          <p className="text-gray-600 dark:text-gray-400">
            Preview not available for this file type
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            File: {fileName}
          </p>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 overflow-hidden ${
          isFullscreen
            ? "w-full h-full max-w-none max-h-none rounded-none"
            : "w-full h-full sm:h-[90vh] sm:max-w-6xl sm:max-h-[800px] sm:rounded-2xl"
        }`}
        style={{
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {/* Header (kept for all sizes; visible on mobile too) */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                {documentTitle}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                {fileName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="hidden sm:block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Maximize2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title="Close Preview"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">{renderPreviewContent()}</div>

        {/* Floating Close for small screens (always visible) */}
        <button
          onClick={onClose}
          className="sm:hidden fixed top-3 right-3 z-[60] rounded-full p-2 bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 shadow-md"
          aria-label="Close"
          title="Close"
        >
          <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
}
