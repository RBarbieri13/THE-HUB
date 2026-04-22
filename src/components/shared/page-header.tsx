import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  eyebrow?: string;
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  eyebrow,
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

      <div className="relative max-w-[1240px] mx-auto px-6 py-14 md:py-20">
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
    </section>
  );
}
