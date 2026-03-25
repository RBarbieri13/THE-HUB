import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, id, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="font-heading text-sm font-semibold text-text-primary"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "min-h-[120px] resize-y rounded-[3px] border border-[#E5E5E5] bg-white px-3 py-2.5 text-sm text-text-primary placeholder:text-text-light/60 transition-all duration-200 hover:border-[#CCCCCC] focus:border-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark/20 focus:shadow-[var(--shadow-focus)] disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-error text-error",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error && textareaId ? `${textareaId}-error` : undefined}
          {...props}
        />
        {error && (
          <p
            id={textareaId ? `${textareaId}-error` : undefined}
            className="text-xs text-error"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea, type TextareaProps };
