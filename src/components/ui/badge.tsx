import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "primary" | "accent" | "success" | "warning" | "error";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-primary-dark",
  accent: "bg-accent",
  success: "bg-success",
  warning: "bg-warning text-text-primary",
  error: "bg-error",
};

const baseStyles =
  "inline-block font-body text-xs font-semibold uppercase tracking-[0.05em] px-2.5 py-1 rounded-sm text-white";

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge, type BadgeProps, type BadgeVariant };
