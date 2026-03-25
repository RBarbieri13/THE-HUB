"use client";

import { useState, useEffect } from "react";
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
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <nav
        className={cn(
          "bg-gradient-to-r from-primary-dark via-primary-dark to-[#0a3d3d] border-b border-white/10 transition-all duration-300",
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
                "w-auto block transition-all duration-300",
                scrolled ? "h-[40px]" : "h-[50px]"
              )}
              priority
            />
          </Link>

          {/* Center — Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const Icon = NAV_ICONS[item.label];
              return (
                <div key={item.label} className="relative group">
                  {"children" in item && item.children ? (
                    <>
                      <button
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-2",
                          "font-heading text-sm font-semibold",
                          "text-white/80 hover:text-white transition-colors"
                        )}
                      >
                        {Icon && <Icon className="h-3.5 w-3.5" />}
                        {item.label}
                        <ChevronDown className="h-3 w-3 opacity-60" />
                      </button>
                      <div
                        className={cn(
                          "absolute left-0 top-full z-50 hidden group-hover:block",
                          "bg-white shadow-xl border border-[#E5E5E5] rounded-md py-3 px-4 min-w-[200px]"
                        )}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block py-2 px-2 text-sm font-medium rounded",
                              "text-text-primary hover:text-primary-dark hover:bg-primary-dark/5",
                              "transition-all duration-200"
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-2",
                        "font-heading text-sm font-semibold",
                        "relative transition-colors",
                        pathname === item.href
                          ? "text-white"
                          : "text-white/70 hover:text-white"
                      )}
                    >
                      {Icon && <Icon className="h-3.5 w-3.5" />}
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
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${CONTACT.phone}`}
              className="flex items-center gap-1 text-white/70 hover:text-white text-xs font-semibold transition-colors"
            >
              <Phone className="h-3 w-3" />
              <span>{CONTACT.phone}</span>
            </a>
            <Link
              href="/login"
              className="text-white/70 hover:text-white text-xs font-semibold transition-colors"
            >
              Login
            </Link>
            <Link
              href="/donate-equipment"
              className="bg-accent text-white px-4 py-1.5 rounded-sm text-sm font-bold shadow-md shadow-accent/25 hover:bg-[#D45F1F] hover:shadow-lg hover:shadow-accent/30 transition-all duration-200 hover:scale-[1.03]"
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
