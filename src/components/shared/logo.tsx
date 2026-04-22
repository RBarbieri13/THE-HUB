import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "mark";
  tone?: "dark" | "light";
  className?: string;
}

export function Logo({ variant = "full", tone = "dark", className }: LogoProps) {
  const inkClass = tone === "light" ? "text-white" : "text-ink-900";
  const subClass = tone === "light" ? "text-white/70" : "text-ink-muted";

  if (variant === "mark") {
    return (
      <div className={cn("flex items-center", className)}>
        <LogoMark />
      </div>
    );
  }

  return (
    <div
      className={cn("flex items-center gap-3", className)}
      aria-label="The Hub — United Spinal Association of Tennessee"
    >
      <LogoMark />
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-[family-name:var(--font-display)] font-medium",
            "text-[26px] tracking-[-0.02em] leading-[1]",
            inkClass
          )}
        >
          The Hub
        </span>
        <span
          className={cn(
            "font-[family-name:var(--font-mono)]",
            "text-[10px] uppercase tracking-[0.14em] mt-1.5",
            subClass
          )}
        >
          United Spinal TN
        </span>
      </div>
    </div>
  );
}

function LogoMark() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-10 w-10 shrink-0"
      aria-hidden="true"
    >
      {/* Base circle */}
      <circle cx="24" cy="24" r="23" fill="#FBF9F4" stroke="#14525B" strokeWidth="1.5" />
      {/* Wheel — front wheel in orange */}
      <circle cx="17" cy="32" r="7" fill="none" stroke="#EE732F" strokeWidth="2.5" />
      <circle cx="17" cy="32" r="2" fill="#EE732F" />
      {/* Wheel — back in teal */}
      <circle cx="33" cy="32" r="7" fill="none" stroke="#14525B" strokeWidth="2.5" />
      <circle cx="33" cy="32" r="2" fill="#14525B" />
      {/* Seat / back */}
      <path
        d="M13 25 L13 14 L22 14 L28 30 Z"
        fill="#EE732F"
        opacity="0.15"
        stroke="#14525B"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Push handle accent */}
      <path
        d="M22 14 L18 9"
        stroke="#14525B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
