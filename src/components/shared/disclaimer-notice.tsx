import { type ReactNode } from "react";
import { Info, AlertTriangle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type DisclaimerVariant = "info" | "warning" | "error";

interface DisclaimerNoticeProps {
  title?: string;
  children: ReactNode;
  variant?: DisclaimerVariant;
}

const VARIANT_STYLES: Record<
  DisclaimerVariant,
  { container: string; gradient: string; iconColor: string; icon: typeof Info }
> = {
  info: {
    container: "border-primary bg-[#E8F9FC]",
    gradient: "bg-gradient-to-r from-primary/5 to-transparent",
    iconColor: "text-primary",
    icon: Info,
  },
  warning: {
    container: "border-warning bg-[#FFF8E1]",
    gradient: "bg-gradient-to-r from-warning/5 to-transparent",
    iconColor: "text-warning",
    icon: AlertTriangle,
  },
  error: {
    container: "border-error bg-[#FDECEA]",
    gradient: "bg-gradient-to-r from-error/5 to-transparent",
    iconColor: "text-error",
    icon: AlertCircle,
  },
};

export function DisclaimerNotice({
  title,
  children,
  variant = "info",
}: DisclaimerNoticeProps) {
  const { container, gradient, iconColor, icon: Icon } = VARIANT_STYLES[variant];

  return (
    <div className={cn(
      "border-l-4 p-6 rounded-[3px] relative overflow-hidden transition-all duration-200 hover:shadow-sm",
      container
    )}>
      {/* Subtle left-to-right gradient tint */}
      <div className={cn("absolute inset-0 pointer-events-none", gradient)} aria-hidden="true" />
      <div className="relative">
        {title && (
          <div className="flex gap-3 items-center mb-3">
            <Icon className={cn("h-5 w-5 shrink-0", iconColor)} aria-hidden="true" />
            <h3 className="font-heading font-semibold">{title}</h3>
          </div>
        )}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
