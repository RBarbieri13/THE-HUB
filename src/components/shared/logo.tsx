import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg";

interface LogoProps {
  size?: LogoSize;
  className?: string;
  priority?: boolean;
}

const SIZE_CLASSES: Record<LogoSize, string> = {
  sm: "h-12 w-12", // 48px — mobile drawer
  md: "h-16 w-16", // 64px — header
  lg: "h-24 w-24", // 96px — footer / emphasis
};

export function Logo({ size = "md", className, priority }: LogoProps) {
  return (
    <Image
      src="/images/logos/logo-primary.png"
      alt="The Hub — Adaptive Equipment Closet, United Spinal of Tennessee"
      width={1254}
      height={1254}
      sizes="96px"
      className={cn(SIZE_CLASSES[size], "object-contain", className)}
      priority={priority}
    />
  );
}
