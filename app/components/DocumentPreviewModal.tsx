"use client";

import { useState, useEffect } from "react";
import {
  X,
  Download,
  Maximize2,
  Minimize2,
  FileText,
  AlertCircle,
  Loader2,
} from "lucide-react";
import api from "@/lib/api";
import mammoth from "mammoth";
import * as XLSX from "xlsx";
import { useToast } from "@/contexts/ToastContext";

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
  canDownload = false,
}: DocumentPreviewModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toast = useToast();
  const [convertedContent, setConvertedContent] = useState<string | null>(null);
  const [excelData, setExcelData] = useState<{
    html: string;
    sheetNames: string[];
    currentSheet: string;
  } | null>(null);
  const [officeViewerUrl, setOfficeViewerUrl] = useState<string | null>(null);
  // Default to false in development unless explicitly enabled by env var
  const [useOfficeViewer, setUseOfficeViewer] = useState(
    process.env.NEXT_PUBLIC_ENABLE_OFFICE_VIEWER === "true"
  );
  const [officeViewerLoaded, setOfficeViewerLoaded] = useState(false);

  // Get file extension and type
  const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";
  const isPDF = fileExtension === "pdf" || mimeType?.includes("pdf");
  const isWord = ["doc", "docx"].includes(fileExtension);
  const isExcel = ["xls", "xlsx"].includes(fileExtension);
  const isPowerPoint = ["ppt", "pptx"].includes(fileExtension);

  useEffect(() => {
    if (isOpen && documentId) {
      loadPreview();
    }
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, documentId]); // loadPreview and previewUrl are intentionally excluded to avoid infinite loops

  const loadPreview = async () => {
    setLoading(true);
    setError(null);
    setConvertedContent(null);
    setExcelData(null);
    setOfficeViewerUrl(null);
    setOfficeViewerLoaded(false);

    try {
      let blob: Blob;
      let publicUrl: string | null = null;

      // Handle demo documents differently
      if (documentId.startsWith("demo-")) {
        blob = await createDemoDocument(documentId);
      } else {
        // Try to get a public URL for Office Online Viewer
        try {
          const publicUrlResponse = await api.get(
            `/documents/${documentId}/public-url`
          );
          publicUrl = publicUrlResponse.data.url;
          console.log("Got public URL for Office Online Viewer:", publicUrl);
        } catch (err) {
          console.log("Public URL not available, falling back to blob:", err);
        }

        const response = await api.get(`/documents/${documentId}/preview`, {
          responseType: "blob",
        });

        // Prefer server-provided content-type; if not provided and file is PDF, force application/pdf
        const serverType =
          response.headers["content-type"] ||
          mimeType ||
          "application/octet-stream";
        const effectiveType =
          serverType === "application/octet-stream" && isPDF
            ? "application/pdf"
            : serverType;
        blob = new Blob([response.data], {
          type: effectiveType,
        });
      }

      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);

      // Try Microsoft Office Online Viewer for Office documents (only when a valid public https URL exists)
      if ((isWord || isExcel || isPowerPoint) && useOfficeViewer) {
        let urlToUse = publicUrl;

        // Filter out localhost/private URLs not reachable by Office Viewer
        const isPublicHttps = (url?: string | null) =>
          !!url &&
          /^https:\/\//i.test(url) &&
          !/localhost|127\.0\.0\.1|0\.0\.0\.0/i.test(url);

        // For demo documents, use a test URL
        if (documentId.startsWith("demo-") && !isPublicHttps(publicUrl)) {
          // Use a publicly available sample document for testing
          if (isWord) {
            urlToUse =
              "https://file-examples.com/storage/fe68c8c7c66c4d5b2b5c9e4/2017/10/file_example_DOC_100kB.doc";
          } else if (isExcel) {
            urlToUse =
              "https://file-examples.com/storage/fe68c8c7c66c4d5b2b5c9e4/2017/10/file_example_XLS_10.xls";
          } else if (isPowerPoint) {
            urlToUse =
              "https://file-examples.com/storage/fe68c8c7c66c4d5b2b5c9e4/2017/10/file_example_PPT_250kB.ppt";
          }
        }

        if (isPublicHttps(urlToUse)) {
          const officeUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
            urlToUse!
          )}`;
          console.log("Setting Office Online Viewer URL:", officeUrl);
          setOfficeViewerUrl(officeUrl);
        }
      }

      // Fallback to client-side conversion for Word and Excel when Office Viewer isn't used
      if ((isWord || isExcel) && !officeViewerUrl) {
        // Fallback to client-side conversion for Word and Excel
        if (isWord) {
          await convertWordDocument(blob);
        } else if (isExcel) {
          await convertExcelDocument(blob);
        }
      }
    } catch (err) {
      console.error("Error loading preview:", err);
      setError("Unable to load document preview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const createDemoDocument = async (demoId: string): Promise<Blob> => {
    if (demoId === "demo-word") {
      return createDemoWordDocument();
    } else if (demoId === "demo-excel") {
      return createDemoExcelDocument();
    } else if (demoId === "demo-pdf") {
      return createDemoPDFDocument();
    } else if (demoId === "demo-powerpoint") {
      return createDemoPowerPointDocument();
    }
    throw new Error("Unknown demo document");
  };

  const createDemoWordDocument = (): Blob => {
    // Create a simple DOCX document using a minimal structure
    const content = `
      <html>
        <body>
          <h1>Demo Word Document</h1>
          <p>This is a demonstration of the Word document preview functionality.</p>
          <h2>Features</h2>
          <ul>
            <li>Real-time document conversion</li>
            <li>HTML rendering of Word content</li>
            <li>Preserves basic formatting</li>
          </ul>
          <p><strong>Note:</strong> This is a demo document created for testing purposes.</p>
        </body>
      </html>
    `;

    // For demo purposes, we'll simulate a converted document
    setConvertedContent(content);
    return new Blob([content], { type: "text/html" });
  };

  const createDemoExcelDocument = (): Blob => {
    // Create demo Excel data
    const demoData = {
      html: `
        <table border="1" style="border-collapse: collapse; width: 100%;">
          <tr style="background-color: #f0f0f0;">
            <th style="padding: 8px;">Product</th>
            <th style="padding: 8px;">Quantity</th>
            <th style="padding: 8px;">Price</th>
            <th style="padding: 8px;">Total</th>
          </tr>
          <tr>
            <td style="padding: 8px;">Widget A</td>
            <td style="padding: 8px; text-align: right;">10</td>
            <td style="padding: 8px; text-align: right;">$25.00</td>
            <td style="padding: 8px; text-align: right;">$250.00</td>
          </tr>
          <tr>
            <td style="padding: 8px;">Widget B</td>
            <td style="padding: 8px; text-align: right;">5</td>
            <td style="padding: 8px; text-align: right;">$45.00</td>
            <td style="padding: 8px; text-align: right;">$225.00</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 8px;"><strong>Total</strong></td>
            <td style="padding: 8px; text-align: right;"><strong>15</strong></td>
            <td style="padding: 8px;"></td>
            <td style="padding: 8px; text-align: right;"><strong>$475.00</strong></td>
          </tr>
        </table>
      `,
      sheetNames: ["Sheet1", "Summary"],
      currentSheet: "Sheet1",
    };

    setExcelData(demoData);
    return new Blob([demoData.html], { type: "text/html" });
  };

  const createDemoPDFDocument = (): Blob => {
    // Create a simple PDF-like content (in reality, this would be a real PDF)
    const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(Demo PDF Document) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000206 00000 n
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
300
%%EOF`;

    return new Blob([pdfContent], { type: "application/pdf" });
  };

  const createDemoPowerPointDocument = (): Blob => {
    // For PowerPoint, we just return a placeholder
    return new Blob(["Demo PowerPoint Content"], {
      type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    });
  };

  const convertWordDocument = async (blob: Blob) => {
    try {
      const arrayBuffer = await blob.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setConvertedContent(result.value);

      if (result.messages.length > 0) {
        console.warn("Word conversion warnings:", result.messages);
      }
    } catch (err) {
      console.error("Error converting Word document:", err);
      setError("Unable to convert Word document for preview.");
    }
  };

  const convertExcelDocument = async (blob: Blob) => {
    try {
      const arrayBuffer = await blob.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      // Convert first sheet to HTML
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

  const handleDownload = async () => {
    if (!canDownload) return;

    try {
      const response = await api.get(`/documents/${documentId}/download`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/octet-stream",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading document:", err);
      toast.error("Unable to download document. Please try again.");
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
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
          <div className="text-center space-y-4 max-w-md">
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

    if (!previewUrl) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center space-y-4">
            <FileText className="w-12 h-12 text-gray-400 mx-auto" />
            <p className="text-gray-600 dark:text-gray-400">
              No preview available
            </p>
          </div>
        </div>
      );
    }

    // For PDFs, use iframe
    if (isPDF) {
      return (
        <iframe
          src={previewUrl}
          className="w-full h-full border-0"
          title={`Preview of ${documentTitle}`}
        />
      );
    }

    // For Office documents, try Microsoft Office Online Viewer first
    if ((isWord || isExcel || isPowerPoint) && officeViewerUrl) {
      return (
        <div className="w-full h-full flex flex-col">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Microsoft Office Online Viewer - 100% Accurate Preview
                </span>
              </div>
              {process.env.NEXT_PUBLIC_ENABLE_OFFICE_VIEWER === "true" && (
                <button
                  onClick={() => {
                    setUseOfficeViewer(false);
                    setOfficeViewerUrl(null);
                    loadPreview();
                  }}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Use Basic Viewer
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 relative">
            {!officeViewerLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 z-10">
                <div className="text-center space-y-4">
                  <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin mx-auto" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Loading Microsoft Office Viewer...
                  </p>
                </div>
              </div>
            )}
            <iframe
              src={officeViewerUrl}
              className="w-full h-full border-0"
              title={`Microsoft Office Preview of ${documentTitle}`}
              onLoad={() => {
                console.log("Office Online Viewer loaded successfully");
                setOfficeViewerLoaded(true);
              }}
              onError={(e) => {
                console.error(
                  "Office Online Viewer failed, falling back to basic viewer",
                  e
                );
                setUseOfficeViewer(false);
                setOfficeViewerUrl(null);
                setOfficeViewerLoaded(false);
                loadPreview();
              }}
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </div>

          {canDownload && (
            <div className="mt-3 flex justify-center">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Download Original
              </button>
            </div>
          )}
        </div>
      );
    }

    // For Word documents, show converted HTML content (fallback)
    if (isWord) {
      return (
        <div className="w-full h-full flex flex-col">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Word Document Preview (Basic)
                </span>
              </div>
              <span className="text-xs text-blue-600 dark:text-blue-400">
                Limited formatting
              </span>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-lg overflow-auto border border-gray-200 dark:border-gray-700">
            {convertedContent ? (
              <div
                className="p-6 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: convertedContent }}
                style={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  lineHeight: "1.6",
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                  <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin mx-auto" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Converting document...
                  </p>
                </div>
              </div>
            )}
          </div>

          {canDownload && (
            <div className="mt-3 flex justify-center">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Download Original
              </button>
            </div>
          )}
        </div>
      );
    }

    // For Excel documents, show converted spreadsheet (fallback)
    if (isExcel) {
      return (
        <div className="w-full h-full flex flex-col">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-800 dark:text-green-200">
                  Excel Spreadsheet Preview (Basic)
                </span>
                {excelData?.sheetNames && excelData.sheetNames.length > 1 && (
                  <span className="text-xs text-green-600 dark:text-green-400 ml-2">
                    ({excelData.sheetNames.length} sheets)
                  </span>
                )}
              </div>
              <span className="text-xs text-green-600 dark:text-green-400">
                Limited formatting
              </span>
            </div>
          </div>

          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg overflow-auto border border-gray-200 dark:border-gray-700">
            {excelData?.html ? (
              <div
                className="p-4"
                dangerouslySetInnerHTML={{ __html: excelData.html }}
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: "14px",
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                  <Loader2 className="w-8 h-8 text-green-600 dark:text-green-400 animate-spin mx-auto" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Converting spreadsheet...
                  </p>
                </div>
              </div>
            )}
          </div>

          {canDownload && (
            <div className="mt-3 flex justify-center">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Download Original
              </button>
            </div>
          )}
        </div>
      );
    }

    // For PowerPoint documents, show a message (fallback when Office Online Viewer not available)
    if (isPowerPoint) {
      return (
        <div className="w-full h-full flex flex-col">
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-orange-800 dark:text-orange-200">
                  PowerPoint Preview Not Available
                </h4>
                <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                  PowerPoint preview requires a public URL. Please download to
                  view or contact your administrator to enable public document
                  URLs.
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-800 dark:to-gray-900 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-6 p-8 max-w-md">
              <div className="w-20 h-20 bg-orange-600 dark:bg-orange-500 rounded-2xl flex items-center justify-center mx-auto">
                <FileText className="w-10 h-10 text-white" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {documentTitle}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-1">
                  PowerPoint Presentation
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
                  {fileName}
                </p>
              </div>

              {canDownload && (
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-colors font-medium"
                >
                  <Download className="w-5 h-5" />
                  Download & Open
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Fallback for other file types
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <FileText className="w-12 h-12 text-gray-400 mx-auto" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Preview Not Available
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            This file type cannot be previewed in the browser.
          </p>
          {canDownload && (
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download File
            </button>
          )}
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 ${
          isFullscreen
            ? "w-full h-full max-w-none max-h-none"
            : "w-full max-w-6xl h-[90vh] max-h-[800px]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {documentTitle}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {fileName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {canDownload && (
              <button
                onClick={handleDownload}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Download Document"
              >
                <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            )}

            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
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
      </div>
    </div>
  );
}
