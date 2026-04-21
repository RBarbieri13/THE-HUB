"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (e.key !== "Tab" || !panelRef.current) return;

    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => closeButtonRef.current?.focus());
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ink-950/60"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 h-full w-[320px] max-w-[85vw] bg-cream-50 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-ink-900/10">
              <Image
                src="/images/logos/logo-horizontal.png"
                alt="The Hub"
                width={160}
                height={40}
                className="h-9 w-auto"
              />
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="p-1 text-ink-900 hover:text-orange-600 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="px-6 py-5 border-b border-ink-900/10 space-y-3">
              <Link
                href="/get-equipment"
                onClick={onClose}
                className="block w-full bg-orange-600 hover:bg-orange-700 text-white text-center font-semibold py-3 rounded-[6px] transition-colors"
              >
                Request Equipment
              </Link>
              <Link
                href="/donate-equipment"
                onClick={onClose}
                className="block w-full border-[1.5px] border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white text-center font-semibold py-3 rounded-[6px] transition-colors"
              >
                Donate Equipment
              </Link>
            </div>

            <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto py-2">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center min-h-[48px] py-3 px-6",
                      "font-[family-name:var(--font-display)] text-[18px]",
                      isActive
                        ? "text-teal-800 font-medium bg-teal-50 border-l-2 border-l-orange-600"
                        : "text-ink-900 hover:text-teal-800 hover:bg-cream-100"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
