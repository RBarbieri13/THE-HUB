"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends HTMLMotionProps<"button"> {
  size?: "sm" | "md" | "lg";
}

export const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, size = "md", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "relative inline-flex items-center justify-center font-heading font-bold text-white rounded-md",
          "bg-gradient-to-r from-primary to-primary-dark",
          "shadow-md hover:shadow-lg transition-shadow duration-200",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark",
          size === "sm" && "px-4 py-2 text-sm",
          size === "md" && "px-6 py-3 text-base",
          size === "lg" && "px-8 py-4 text-lg",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

GradientButton.displayName = "GradientButton";
