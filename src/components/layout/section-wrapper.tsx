import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

const BG_MAP = {
  white: "bg-white text-text-body",
  "off-white": "bg-off-white text-text-body",
  primary: "bg-primary text-white",
  "primary-dark": "bg-primary-dark text-white",
  dark: "bg-dark text-white",
  black: "bg-black text-white",
  accent: "bg-accent text-white",
} as const;

interface SectionWrapperProps {
  children: ReactNode;
  bg?: keyof typeof BG_MAP;
  className?: string;
  id?: string;
}

export function SectionWrapper({
  children,
  bg = "white",
  className,
  id,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-20 md:py-28", BG_MAP[bg], className)}>
      <div className="max-w-7xl mx-auto px-6">{children}</div>
    </section>
  );
}
