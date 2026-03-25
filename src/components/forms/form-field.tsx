import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function FormField({
  label,
  error,
  hint,
  required,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="font-heading text-sm font-semibold text-text-primary">
        {label}
        {required && <span className="text-error ml-0.5">*</span>}
      </label>
      {hint && (
        <span className="text-text-light text-xs">{hint}</span>
      )}
      {children}
      {error && (
        <div role="alert" className="text-error text-sm mt-1">
          {error}
        </div>
      )}
    </div>
  );
}
