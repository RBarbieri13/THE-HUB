import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { FOOTER_LINKS, CONTACT, ORG_NAME, ORG_URL } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 text-ink-300 font-[family-name:var(--font-body)] text-[15px]">
      <div className="max-w-[1240px] mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-12">
          {/* About */}
          <div>
            <Image
              src="/images/logos/logo-horizontal.png"
              alt="The Hub"
              width={180}
              height={54}
              className="h-10 w-auto mb-5 brightness-0 invert"
            />
            <p className="leading-relaxed text-ink-200 max-w-[38ch]">
              A program of the{" "}
              <a
                href={ORG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-baseline gap-1 text-white underline decoration-orange-500/60 underline-offset-4 decoration-2 hover:decoration-orange-400 transition-colors focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:outline-offset-2 rounded-sm"
              >
                United Spinal Association of Tennessee
                <ExternalLink className="h-3 w-3 opacity-70 self-center" aria-hidden="true" />
                <span className="sr-only">(opens in new tab)</span>
              </a>
              . We collect, refurbish, and redistribute adaptive mobility
              equipment to Tennesseans — at no cost.
            </p>
            <p className="mt-4 text-[13px] text-ink-400">
              Opened February 2026 · Funded by the Craig H. Neilsen Foundation
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white text-[13px] uppercase tracking-[0.1em] font-semibold mb-5">
              Take action
            </h5>
            <ul className="space-y-1.5">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h5 className="text-white text-[13px] uppercase tracking-[0.1em] font-semibold mb-5">
              About
            </h5>
            <ul className="space-y-1.5">
              {FOOTER_LINKS.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <a
                  href={ORG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-ink-300 hover:text-white transition-colors"
                >
                  Visit USAT
                  <ExternalLink className="h-3 w-3 opacity-70" aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-white text-[13px] uppercase tracking-[0.1em] font-semibold mb-5">
              Contact
            </h5>
            <ul className="space-y-3 text-ink-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-ink-400" />
                <span>
                  {CONTACT.locationLabel}
                  <br />
                  <span className="text-ink-400 text-[13px]">
                    {CONTACT.serviceArea}
                  </span>
                </span>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0 text-ink-400" />
                  <span>{CONTACT.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0 text-ink-400" />
                  <span>{CONTACT.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[13px] text-ink-400">
          <p>
            &copy; {year} {ORG_NAME}. 501(c)(3) nonprofit · All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {FOOTER_LINKS.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors"
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
