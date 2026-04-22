import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  eyebrow?: string;
  image?: {
    src: string;
    alt: string;
  };
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  eyebrow,
  image,
}: PageHeaderProps) {
  return (
    <section className="relative bg-cream-50 border-b border-ink-900/10 overflow-hidden">
      {/* Decorative gradient rail */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-600 via-orange-400 to-teal-500"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(circle_at_90%_0%,#0C3940_0%,transparent_50%)]"
      />

      <div className="relative max-w-[1280px] mx-auto px-6 py-14 md:py-20">
        <div
          className={
            image
              ? "grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14 items-center"
              : ""
          }
        >
          <div>
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav
                aria-label="Breadcrumb"
                className="flex items-center flex-wrap gap-x-1 font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-ink-muted"
              >
                {breadcrumbs.map((crumb, index) => (
                  <span key={crumb.label} className="flex items-center gap-1">
                    {index > 0 && (
                      <ChevronRight
                        className="h-3 w-3 text-ink-muted/60"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                    )}
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="hover:text-orange-600 transition-colors px-1 py-1 rounded focus-visible:outline-2 focus-visible:outline-teal-700 focus-visible:outline-offset-2"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-ink-900 px-1">{crumb.label}</span>
                    )}
                  </span>
                ))}
              </nav>
            )}
            {eyebrow && (
              <span className="eyebrow mt-6 inline-flex">{eyebrow}</span>
            )}
            <h1 className="h1-editorial mt-5 max-w-[24ch]">{title}</h1>
            {subtitle && (
              <p className="lead-editorial mt-5 max-w-[60ch]">{subtitle}</p>
            )}
          </div>

          {image && (
            <div className="relative aspect-[5/4] lg:aspect-[4/3] rounded-[16px] overflow-hidden bg-ink-200 shadow-[0_20px_60px_-20px_rgba(12,57,64,0.3)]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 440px"
                className="object-cover"
              />
              {/* Subtle vignette for legibility of decorative overlays if any */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink-950/20 via-transparent to-transparent"
              />
              {/* Accent offset */}
              <div
                aria-hidden="true"
                className="absolute -z-10 -bottom-3 -right-3 w-full h-full rounded-[16px] bg-orange-500/90"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
