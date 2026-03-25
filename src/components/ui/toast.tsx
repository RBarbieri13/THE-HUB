"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info" | "warning";

interface ToastMessage {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

const variantBorderColors: Record<ToastVariant, string> = {
  success: "border-l-success",
  error: "border-l-error",
  info: "border-l-primary-dark",
  warning: "border-l-warning",
};

const variantIcons: Record<ToastVariant, string> = {
  success: "Success",
  error: "Error",
  info: "Info",
  warning: "Warning",
};

interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

function Toast({ toast: toastData, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toastData.id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [toastData.id, onDismiss]);

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-[3px] border-l-4 bg-white px-4 py-3 shadow-md transition-all duration-200",
        variantBorderColors[toastData.variant]
      )}
    >
      <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-text-secondary">
        {variantIcons[toastData.variant]}
      </span>
      <p className="flex-1 text-sm text-text-primary">{toastData.message}</p>
      <button
        type="button"
        onClick={() => onDismiss(toastData.id)}
        className="shrink-0 text-text-secondary hover:text-text-primary transition-colors duration-200 cursor-pointer"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function ToastContainer({ toasts, onDismiss }: { toasts: ToastMessage[]; onDismiss: (id: string) => void }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-[360px] max-w-[calc(100vw-2rem)]">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

let toastCounter = 0;

function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, variant: ToastVariant = "info") => {
    const id = `toast-${++toastCounter}-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, variant }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

export {
  ToastProvider,
  ToastContainer,
  Toast,
  useToast,
  type ToastVariant,
  type ToastMessage,
};
