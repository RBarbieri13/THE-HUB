import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

const BG_MAP = {
  white: "bg-white text-ink-body",
  "off-white": "bg-cream-100 text-ink-body",
  cream: "bg-cream-50 text-ink-body",
  primary: "bg-teal-700 text-white",
  "primary-dark": "bg-teal-800 text-white",
  dark: "bg-ink-950 text-white",
  black: "bg-ink-950 text-white",
  accent: "bg-orange-600 text-white",
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
      <div className="max-w-[1240px] mx-auto px-6">{children}</div>
    </section>
  );
}
