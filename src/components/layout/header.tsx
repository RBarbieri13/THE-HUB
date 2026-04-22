"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, HandHeart, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";

const PRIMARY_NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Inventory", href: "/inventory" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Partners", href: "/partners" },
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
        <div className="max-w-[1240px] mx-auto px-6 flex items-center justify-center gap-3 h-9">
          <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-orange-400">
            New
          </span>
          <span className="text-white/85">
            The Hub opened in February 2026 — donations and requests welcome.
          </span>
          <Link
            href="/about"
            className="hidden sm:inline-flex text-white hover:text-orange-400 underline underline-offset-2 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:outline-offset-2"
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
          scrolled && "shadow-[0_2px_10px_rgba(12,57,64,0.08)]"
        )}
      >
        <div className="max-w-[1240px] mx-auto px-6 flex items-center justify-between gap-6 h-[80px]">
          {/* Logo */}
          <Link
            href="/"
            aria-label="The Hub — home"
            className="shrink-0 flex items-center -ml-1 rounded-md focus-visible:outline-2 focus-visible:outline-teal-700 focus-visible:outline-offset-2"
          >
            <Image
              src="/images/logos/logo-horizontal.png"
              alt="The Hub — United Spinal Association of Tennessee"
              width={1536}
              height={1024}
              sizes="(max-width: 768px) 180px, 260px"
              className={cn(
                "w-auto transition-[height] duration-300",
                scrolled ? "h-[52px]" : "h-[60px]"
              )}
              priority
            />
          </Link>

          {/* Desktop primary nav */}
          <div className="hidden lg:flex items-center gap-1">
            {PRIMARY_NAV.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative flex items-center h-11 px-4",
                    "text-[16px] font-[family-name:var(--font-body)] font-semibold tracking-[-0.005em]",
                    "rounded-md transition-colors",
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
                      className="absolute left-4 right-4 -bottom-px h-[2.5px] bg-orange-600 rounded-t-sm"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link
              href="/contact"
              className={cn(
                "flex items-center h-11 px-4",
                "text-[15px] font-semibold text-ink-900 hover:text-teal-800",
                "rounded-md transition-colors",
                "focus-visible:outline-2 focus-visible:outline-teal-700 focus-visible:outline-offset-2"
              )}
            >
              Contact
            </Link>
            <Link
              href="/get-equipment"
              className={cn(
                "inline-flex items-center gap-2 h-11 px-5",
                "bg-orange-600 hover:bg-orange-700 text-white",
                "text-[15px] font-bold rounded-md",
                "shadow-[0_4px_14px_rgba(238,115,47,0.35)] hover:shadow-[0_6px_20px_rgba(238,115,47,0.5)]",
                "transition-all duration-200",
                "focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:outline-offset-2"
              )}
            >
              <HandHeart className="h-4 w-4" aria-hidden="true" />
              Need Something
            </Link>
            <Link
              href="/donate-equipment"
              className={cn(
                "inline-flex items-center gap-2 h-11 px-5",
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
              "lg:hidden inline-flex items-center justify-center h-11 w-11 -mr-2",
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
        <div className="max-w-[1240px] mx-auto px-4 py-2.5 flex gap-2">
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

      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}
