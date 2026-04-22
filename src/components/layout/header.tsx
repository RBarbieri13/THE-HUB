"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, HandHeart, Heart, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import { MobileNav } from "./mobile-nav";

const PRIMARY_NAV = [
  { label: "About", href: "/about" },
  { label: "Inventory", href: "/inventory" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement bar */}
      <div className="bg-ink-950 text-white text-[13px]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 flex items-center justify-center gap-2 md:gap-3 h-9">
          <span className="font-[family-name:var(--font-mono)] text-[10px] md:text-[11px] uppercase tracking-[0.14em] text-orange-400 shrink-0">
            New
          </span>
          <span className="text-white/85 text-[12px] md:text-[13px] truncate">
            Opened February 2026 — donations and requests welcome.
          </span>
          <Link
            href="/about"
            className="hidden sm:inline-flex text-white hover:text-orange-400 underline underline-offset-2 font-medium text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:outline-offset-2 shrink-0"
          >
            Learn more
          </Link>
        </div>
      </div>

      {/* Main bar */}
      <nav
        aria-label="Primary"
        className={cn(
          "bg-cream-50/95 backdrop-blur-md border-b border-ink-900/10 transition-all duration-300",
          scrolled && "shadow-[0_4px_16px_rgba(12,57,64,0.08)]"
        )}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 flex items-center justify-between gap-4 h-[84px]">
          {/* Logo */}
          <Link
            href="/"
            aria-label="The Hub — home"
            className={cn(
              "shrink-0 flex items-center",
              "rounded-md -ml-1 py-1 pr-2",
              "hover:opacity-90 transition-opacity",
              "focus-visible:outline-2 focus-visible:outline-teal-700 focus-visible:outline-offset-2"
            )}
          >
            <Logo size="md" priority />
          </Link>

          {/* Desktop primary nav */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {PRIMARY_NAV.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative flex items-center h-11 px-3.5",
                    "text-[17px] font-[family-name:var(--font-body)] font-bold tracking-[-0.01em]",
                    "rounded-md transition-colors whitespace-nowrap",
                    "focus-visible:outline-2 focus-visible:outline-teal-700 focus-visible:outline-offset-2",
                    isActive
                      ? "text-teal-900"
                      : "text-ink-900 hover:text-teal-800"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute left-3.5 right-3.5 -bottom-px h-[3px] bg-orange-600 rounded-t-sm"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right actions — desktop */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Link
              href="/get-equipment"
              className={cn(
                "group inline-flex items-center gap-2 h-11 px-4",
                "bg-orange-600 hover:bg-orange-700 text-white",
                "text-[15px] font-bold rounded-md",
                "shadow-[0_4px_14px_rgba(238,115,47,0.35)] hover:shadow-[0_6px_20px_rgba(238,115,47,0.5)]",
                "transition-all duration-200",
                "focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:outline-offset-2"
              )}
            >
              <HandHeart className="h-4 w-4" aria-hidden="true" />
              Need Something
              <ArrowRight className="h-3.5 w-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
            <Link
              href="/donate-equipment"
              className={cn(
                "inline-flex items-center gap-2 h-11 px-4",
                "bg-teal-700 hover:bg-teal-800 text-white",
                "text-[15px] font-bold rounded-md",
                "transition-all duration-200",
                "focus-visible:outline-2 focus-visible:outline-teal-700 focus-visible:outline-offset-2"
              )}
            >
              <Heart className="h-4 w-4" aria-hidden="true" />
              Donate
            </Link>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            className={cn(
              "lg:hidden inline-flex items-center justify-center h-11 w-11",
              "text-ink-900 rounded-md",
              "hover:bg-ink-900/5 active:bg-ink-900/10",
              "transition-colors",
              "focus-visible:outline-2 focus-visible:outline-teal-700 focus-visible:outline-offset-2"
            )}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile sticky CTA strip */}
      <div className="lg:hidden bg-cream-50 border-b border-ink-900/10">
        <div className="max-w-[1280px] mx-auto px-4 py-2.5 flex gap-2">
          <Link
            href="/get-equipment"
            className={cn(
              "flex-1 inline-flex items-center justify-center gap-2 h-11 px-3",
              "bg-orange-600 hover:bg-orange-700 text-white text-[14px] font-bold rounded-md",
              "shadow-[0_3px_10px_rgba(238,115,47,0.3)]",
              "focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:outline-offset-2"
            )}
          >
            <HandHeart className="h-4 w-4" aria-hidden="true" />
            Need Something
          </Link>
          <Link
            href="/donate-equipment"
            className={cn(
              "flex-1 inline-flex items-center justify-center gap-2 h-11 px-3",
              "bg-teal-700 hover:bg-teal-800 text-white text-[14px] font-bold rounded-md",
              "focus-visible:outline-2 focus-visible:outline-teal-700 focus-visible:outline-offset-2"
            )}
          >
            <Heart className="h-4 w-4" aria-hidden="true" />
            Donate
          </Link>
        </div>
      </div>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
