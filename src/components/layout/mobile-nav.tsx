"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, HandHeart, Heart, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/lib/constants";
import { Logo } from "@/components/shared/logo";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Inventory", href: "/inventory" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Partners", href: "/partners" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
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
    },
    [onClose]
  );

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
            className="fixed top-0 right-0 z-50 h-full w-[340px] max-w-[88vw] bg-cream-50 flex flex-col shadow-[-20px_0_60px_rgba(12,57,64,0.2)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-ink-900/10">
              <Logo />
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="inline-flex items-center justify-center h-11 w-11 rounded-md text-ink-900 hover:bg-ink-900/5 active:bg-ink-900/10 transition-colors focus-visible:outline-2 focus-visible:outline-teal-700 focus-visible:outline-offset-2"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* CTAs */}
            <div className="px-6 py-5 border-b border-ink-900/10 space-y-3">
              <Link
                href="/get-equipment"
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 h-12 bg-orange-600 hover:bg-orange-700 text-white text-[15px] font-bold rounded-md shadow-[0_4px_14px_rgba(238,115,47,0.35)] focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:outline-offset-2"
              >
                <HandHeart className="h-4 w-4" aria-hidden="true" />
                Need Something
              </Link>
              <Link
                href="/donate-equipment"
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 h-12 bg-teal-700 hover:bg-teal-800 text-white text-[15px] font-bold rounded-md focus-visible:outline-2 focus-visible:outline-teal-700 focus-visible:outline-offset-2"
              >
                <Heart className="h-4 w-4" aria-hidden="true" />
                Donate Equipment
              </Link>
            </div>

            {/* Nav */}
            <nav
              aria-label="Mobile navigation"
              className="flex-1 overflow-y-auto py-2"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center min-h-[52px] py-3 px-6",
                      "font-[family-name:var(--font-display)] text-[20px] font-medium",
                      "transition-colors",
                      "focus-visible:outline-2 focus-visible:outline-teal-700 focus-visible:outline-offset-2 focus-visible:outline-offset-[-2px]",
                      isActive
                        ? "text-teal-900 bg-cream-100 border-l-[3px] border-l-orange-600"
                        : "text-ink-900 hover:text-teal-800 hover:bg-cream-100 border-l-[3px] border-l-transparent"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Contact footer */}
            <div className="border-t border-ink-900/10 px-6 py-5 bg-cream-100 space-y-2.5">
              <a
                href={`tel:${CONTACT.phone}`}
                className="flex items-center gap-2.5 text-ink-900 hover:text-teal-800 transition-colors text-[15px] font-semibold"
              >
                <Phone className="h-4 w-4 text-teal-700" />
                {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2.5 text-ink-900 hover:text-teal-800 transition-colors text-[14px]"
              >
                <Mail className="h-4 w-4 text-teal-700" />
                {CONTACT.email}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
