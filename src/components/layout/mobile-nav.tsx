"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  X,
  ChevronDown,
  Home,
  Info,
  Armchair,
  Package,
  Video,
  HelpCircle,
  MessageCircle,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";

const NAV_ICONS: Record<string, React.ElementType> = {
  Home,
  About: Info,
  Equipment: Armchair,
  Inventory: Package,
  "Live Closet": Video,
  "How It Works": HelpCircle,
  FAQ: MessageCircle,
  Contact: Mail,
};

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  function toggleExpand(label: string) {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((l) => l !== label)
        : [...prev, label]
    );
  }

  // Focus trap
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
      // Focus close button on open
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
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 h-full w-[300px] max-w-[80vw] bg-white"
          >
            {/* Top accent bar */}
            <div className="h-1 bg-accent" />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <Image
                src="/images/logos/logo-horizontal.png"
                alt="The Hub"
                width={160}
                height={40}
                className="h-8 w-auto mb-2"
              />
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="p-1 text-text-primary"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* CTA */}
            <div className="px-6 py-4 border-b border-border">
              <Link
                href="/get-equipment"
                onClick={onClose}
                className="block w-full bg-accent text-white text-center font-bold py-3 rounded-sm hover:opacity-90 transition-opacity duration-200"
              >
                Request Equipment
              </Link>
            </div>

            {/* Nav Links */}
            <nav aria-label="Mobile navigation" className="overflow-y-auto h-[calc(100%-65px-72px)]">
              {NAV_ITEMS.map((item) => {
                const Icon = NAV_ICONS[item.label];
                return (
                  <div key={item.label}>
                    {"children" in item && item.children ? (
                      <>
                        <button
                          onClick={() => toggleExpand(item.label)}
                          aria-expanded={expandedItems.includes(item.label)}
                          className={cn(
                            "flex items-center justify-between w-full",
                            "min-h-[48px] py-3 px-6 border-b border-border",
                            "font-heading text-base text-text-primary"
                          )}
                        >
                          <span className="flex items-center gap-2.5">
                            {Icon && (
                              <Icon className="h-4 w-4 text-primary-dark/60" />
                            )}
                            {item.label}
                          </span>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-200",
                              expandedItems.includes(item.label) && "rotate-180"
                            )}
                          />
                        </button>
                        {expandedItems.includes(item.label) &&
                          item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={onClose}
                              className={cn(
                                "block min-h-[48px] py-3 pl-12 pr-6 border-b border-border",
                                "font-heading text-sm",
                                pathname === child.href
                                  ? "text-primary-dark font-bold bg-primary-dark/5"
                                  : "text-text-primary hover:text-primary-dark"
                              )}
                            >
                              {child.label}
                            </Link>
                          ))}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-2.5 min-h-[48px] py-3 px-6 border-b border-border",
                          "font-heading text-base",
                          pathname === item.href
                            ? "text-primary-dark font-bold border-l-3 border-l-primary-dark bg-primary-dark/5"
                            : "text-text-primary hover:text-primary-dark"
                        )}
                      >
                        {Icon && (
                          <Icon className="h-4 w-4 text-primary-dark/60" />
                        )}
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
