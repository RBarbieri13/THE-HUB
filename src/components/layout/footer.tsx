import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { FOOTER_LINKS, CONTACT, ORG_NAME } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();
  const fullAddress = `${CONTACT.address.street}, ${CONTACT.address.city}, ${CONTACT.address.state} ${CONTACT.address.zip}`;

  return (
    <footer className="bg-dark text-[#AAAAAA] font-body text-base">
      <div className="h-1 bg-gradient-to-r from-accent via-primary to-primary-dark" />
      <div className="max-w-7xl mx-auto py-20 px-6">
        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <Image
              src="/images/logos/logo-stacked.png"
              alt="The Hub — United Spinal Association of Tennessee"
              width={140}
              height={140}
              className="h-28 w-auto mb-4 brightness-0 invert"
            />
            <p className="leading-relaxed">
              Helping Tennesseans with spinal cord injuries and related mobility
              disabilities access refurbished wheelchairs, adaptive equipment,
              and supplies at no cost.
            </p>
            <p className="mt-3 text-xs text-[#888888]">
              Funded by the Craig H. Neilsen Foundation
            </p>
            {/* TODO: Add social links when real URLs are available */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#CCCCCC] no-underline hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent">
              Information
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#CCCCCC] no-underline hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[#CCCCCC]" />
                <span>{fullAddress}</span>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="flex items-center gap-2 text-[#CCCCCC] no-underline hover:text-white hover:underline"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>{CONTACT.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2 text-[#CCCCCC] no-underline hover:text-white hover:underline"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  <span>{CONTACT.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Tagline & Copyright */}
        <div className="border-t border-[#444444] mt-12 pt-8 text-center">
          <p className="text-white/60 text-sm mb-6">Empowering independence through adaptive equipment — proudly serving Tennessee.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-white/60">
          <p>
            &copy; {year} {ORG_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {FOOTER_LINKS.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#888888] no-underline hover:text-white hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
