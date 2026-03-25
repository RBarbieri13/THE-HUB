"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface OutlineButtonProps extends HTMLMotionProps<"button"> {
  size?: "sm" | "md" | "lg";
}

export const OutlineButton = forwardRef<HTMLButtonElement, OutlineButtonProps>(
  ({ className, size = "md", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "relative inline-flex items-center justify-center font-heading font-bold rounded-md",
          "border-2 border-primary-dark text-primary-dark bg-white",
          "hover:bg-primary-dark/5 transition-colors duration-200",
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

OutlineButton.displayName = "OutlineButton";
