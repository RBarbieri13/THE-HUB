import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "donate";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white border-2 border-accent hover:bg-[#D45F1F] hover:border-[#D45F1F] hover:shadow-lg hover:shadow-accent/20 active:scale-[0.98]",
  secondary:
    "bg-primary-dark text-white border-2 border-primary-dark hover:bg-[#166D7D] hover:border-[#166D7D] hover:shadow-lg hover:shadow-primary-dark/20 active:scale-[0.98]",
  outline:
    "bg-transparent text-accent border-2 border-accent hover:bg-accent hover:text-white active:scale-[0.98]",
  ghost:
    "bg-transparent text-primary-dark border-2 border-transparent hover:text-[#166D7D]",
  donate:
    "bg-donate-red text-white border-2 border-donate-border hover:bg-[#AA0000]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-[18px] py-2 text-sm min-w-[100px]",
  md: "px-[30px] py-[14px] text-base min-w-[150px]",
  lg: "px-10 py-[18px] text-lg min-w-[200px]",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-sm font-heading font-semibold leading-none cursor-pointer transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize };
