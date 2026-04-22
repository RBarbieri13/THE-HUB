import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg";

interface LogoProps {
  size?: LogoSize;
  className?: string;
  priority?: boolean;
}

const SIZE_CLASSES: Record<LogoSize, string> = {
  sm: "h-36 w-36", // 144px — mobile drawer
  md: "h-48 w-48", // 192px — header
  lg: "h-72 w-72", // 288px — footer / emphasis
};

export function Logo({ size = "md", className, priority }: LogoProps) {
  return (
    <Image
      src="/images/logos/logo-primary.png"
      alt="The Hub — Adaptive Equipment Closet, United Spinal of Tennessee"
      width={1254}
      height={1254}
      sizes="288px"
      className={cn(SIZE_CLASSES[size], "object-contain", className)}
      priority={priority}
    />
  );
}
