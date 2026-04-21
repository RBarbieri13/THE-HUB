"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/lib/constants";
import { MobileNav } from "./mobile-nav";

const PRIMARY_NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Inventory", href: "/inventory" },
  { label: "Request", href: "/get-equipment" },
  { label: "Donate", href: "/donate-equipment" },
  { label: "Live Closet", href: "/live-closet" },
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
      {/* Utility bar */}
      <div className="bg-ink-950 text-white/85 text-[13px]">
        <div className="max-w-[1240px] mx-auto px-6 flex items-center justify-between h-10">
          <div className="flex items-center gap-3 font-[family-name:var(--font-mono)] tracking-wide text-ink-300">
            <span className="hidden sm:inline text-ink-300/80">
              United Spinal Association of Tennessee
            </span>
            <span className="hidden sm:inline text-ink-300/50">·</span>
            <span className="text-ink-300/80">Equipment Closet</span>
          </div>
          <a
            href={`tel:${CONTACT.phone}`}
            className="flex items-center gap-2 text-white hover:text-orange-500 transition-colors font-[family-name:var(--font-mono)]"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>{CONTACT.phone}</span>
          </a>
        </div>
      </div>

      {/* Main bar */}
      <nav
        className={cn(
          "bg-cream-50/90 backdrop-blur-md border-b transition-shadow duration-300",
          scrolled ? "shadow-sm border-ink-900/10" : "border-ink-900/10"
        )}
      >
        <div className="max-w-[1240px] mx-auto px-6 flex items-center justify-between h-[72px] gap-6">
          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center gap-3">
            <Image
              src="/images/logos/logo-horizontal.png"
              alt="The Hub — United Spinal Association of Tennessee"
              width={600}
              height={180}
              className={cn(
                "w-auto transition-[height] duration-300",
                scrolled ? "h-[38px]" : "h-[44px]"
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
                  className={cn(
                    "relative px-3.5 py-2 text-[15px] font-medium transition-colors",
                    isActive ? "text-teal-800" : "text-ink-800 hover:text-teal-800"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] bg-orange-600" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="px-3 py-2 text-[15px] font-medium text-ink-800 hover:text-teal-800 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/donate-equipment"
              className="inline-flex items-center px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-[15px] font-semibold rounded-[6px] transition-colors shadow-sm"
            >
              Donate Equipment
            </Link>
          </div>

          {/* Mobile trigger */}
          <button
            className="lg:hidden p-2 text-ink-900"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}
