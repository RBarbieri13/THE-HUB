"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Phone,
  Menu,
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
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, CONTACT } from "@/lib/constants";
import { MobileNav } from "./mobile-nav";

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

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeDropdown = useCallback(() => setDropdownOpen(null), []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") closeDropdown();
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [dropdownOpen, closeDropdown]);

  return (
    <header className="sticky top-0 z-50">
      <nav
        className={cn(
          "bg-primary-dark border-b border-white/10 transition-shadow duration-300",
          scrolled ? "shadow-lg" : ""
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-6">
          {/* Left — Logo */}
          <Link href="/" className="shrink-0 flex items-center py-2">
            <Image
              src="/images/logos/logo-horizontal.png"
              alt="The Hub — United Spinal Association of Tennessee"
              width={600}
              height={180}
              className={cn(
                "w-auto block transition-[height] duration-300",
                scrolled ? "h-[40px]" : "h-[50px]"
              )}
              priority
            />
          </Link>

          {/* Center — Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = NAV_ICONS[item.label];
              return (
                <div key={item.label} className="relative" ref={"children" in item && item.children ? dropdownRef : undefined}>
                  {"children" in item && item.children ? (
                    <>
                      <button
                        onClick={() => setDropdownOpen(dropdownOpen === item.label ? null : item.label)}
                        aria-expanded={dropdownOpen === item.label}
                        aria-haspopup="true"
                        className={cn(
                          "flex items-center gap-2 px-3.5 py-3.5",
                          "font-heading text-[0.9375rem] font-semibold",
                          "text-white/85 hover:text-white transition-colors"
                        )}
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        {item.label}
                        <ChevronDown className={cn(
                          "h-3.5 w-3.5 opacity-60 transition-transform duration-200",
                          dropdownOpen === item.label && "rotate-180"
                        )} />
                      </button>
                      {dropdownOpen === item.label && (
                        <div
                          role="menu"
                          className="absolute left-0 top-full z-50 bg-white shadow-xl border border-border rounded-md py-3 px-4 min-w-[220px]"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              role="menuitem"
                              onClick={closeDropdown}
                              className={cn(
                                "block py-2.5 px-3 text-[0.9375rem] font-medium rounded",
                                "text-text-primary hover:text-primary-dark hover:bg-primary-dark/5",
                                "transition-colors duration-200"
                              )}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 px-3.5 py-3.5",
                        "font-heading text-[0.9375rem] font-semibold",
                        "relative transition-colors",
                        pathname === item.href
                          ? "text-white"
                          : "text-white/85 hover:text-white"
                      )}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      {item.label}
                      {pathname === item.href && (
                        <motion.span
                          layoutId="nav-active-indicator"
                          className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right — Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${CONTACT.phone}`}
              className="flex items-center gap-1.5 text-white/85 hover:text-white text-[0.9375rem] font-semibold transition-colors py-2"
            >
              <Phone className="h-4 w-4" />
              <span>{CONTACT.phone}</span>
            </a>
            <Link
              href="/login"
              className="text-white/85 hover:text-white text-[0.9375rem] font-semibold transition-colors py-2"
            >
              Login
            </Link>
            <Link
              href="/donate-equipment"
              className="bg-accent text-white px-5 py-2.5 rounded-sm text-[0.9375rem] font-bold shadow-md shadow-accent/25 hover:bg-[#D45F1F] transition-colors duration-200"
            >
              Donate
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
