"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";

export type ToastVariant = "success" | "error" | "info" | "warning";

export type ToastOptions = {
  id?: string;
  title?: string;
  message: string;
  variant?: ToastVariant;
  duration?: number; // ms
};

type ToastInternal = Required<Omit<ToastOptions, "id">> & { id: string };

type ToastContextType = {
  show: (opts: ToastOptions) => void;
  success: (
    message: string,
    opts?: Omit<ToastOptions, "message" | "variant">
  ) => void;
  error: (
    message: string,
    opts?: Omit<ToastOptions, "message" | "variant">
  ) => void;
  info: (
    message: string,
    opts?: Omit<ToastOptions, "message" | "variant">
  ) => void;
  warning: (
    message: string,
    opts?: Omit<ToastOptions, "message" | "variant">
  ) => void;
  showToast: (message: string, type: "success" | "error") => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastInternal[]>([]);
  const timers = useRef<Record<string, NodeJS.Timeout>>({});

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current[id];
    if (timer) {
      clearTimeout(timer);
      delete timers.current[id];
    }
  }, []);

  const show = useCallback(
    (opts: ToastOptions) => {
      const id = opts.id || Math.random().toString(36).slice(2);
      const toast: ToastInternal = {
        id,
        title: opts.title ?? "",
        message: opts.message,
        variant: opts.variant ?? "info",
        duration: opts.duration ?? 3000,
      };
      setToasts((prev) => [...prev, toast]);
      timers.current[id] = setTimeout(() => remove(id), toast.duration);
    },
    [remove]
  );

  const api = useMemo<ToastContextType>(
    () => ({
      show,
      success: (message, opts) =>
        show({ message, variant: "success", ...opts }),
      error: (message, opts) => show({ message, variant: "error", ...opts }),
      info: (message, opts) => show({ message, variant: "info", ...opts }),
      warning: (message, opts) =>
        show({ message, variant: "warning", ...opts }),
      showToast: (message, type) => show({ message, variant: type }),
    }),
    [show]
  );

  useEffect(
    () => () => {
      // cleanup timers on unmount
      Object.values(timers.current).forEach(clearTimeout);
    },
    []
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      {/* Toast Container: bottom-right, mobile-friendly */}
      <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-[1000] flex flex-col-reverse gap-3 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={
              "pointer-events-auto max-w-[90vw] sm:max-w-[360px] rounded-xl border p-4 shadow-lg text-sm text-white " +
              (t.variant === "success"
                ? "bg-emerald-600 dark:bg-emerald-500 border-transparent"
                : t.variant === "error"
                ? "bg-red-600 dark:bg-red-500 border-transparent"
                : t.variant === "warning"
                ? "bg-amber-600 dark:bg-amber-500 border-transparent"
                : "bg-blue-600 dark:bg-blue-500 border-transparent")
            }
            role="status"
          >
            {t.title && <div className="font-semibold mb-0.5">{t.title}</div>}
            <div>{t.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
