import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "loud"
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "inverse";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  loud: "bg-orange-600 text-white hover:bg-orange-700 shadow-[0_6px_20px_rgba(238,115,47,0.35)] hover:shadow-[0_8px_26px_rgba(238,115,47,0.5)] focus-visible:outline-orange-400",
  primary:
    "bg-orange-600 text-white hover:bg-orange-700 shadow-sm hover:shadow-md focus-visible:outline-orange-400",
  secondary:
    "bg-teal-700 text-white hover:bg-teal-800 focus-visible:outline-teal-700",
  outline:
    "bg-transparent text-ink-900 border-[1.5px] border-ink-900 hover:bg-ink-900 hover:text-white focus-visible:outline-ink-900",
  ghost:
    "bg-transparent text-ink-900 hover:bg-ink-900/5 focus-visible:outline-teal-700",
  inverse:
    "bg-white text-ink-900 hover:bg-cream-100 focus-visible:outline-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-[14px] gap-1.5",
  md: "h-11 px-5 text-[15px] gap-2",
  lg: "h-[52px] px-6 text-[16px] gap-2",
};

const baseStyles =
  "inline-flex items-center justify-center font-[family-name:var(--font-body)] font-bold leading-none rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize };
