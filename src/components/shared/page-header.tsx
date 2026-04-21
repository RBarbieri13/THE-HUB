import Link from "next/link";

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
    <section className="bg-cream-50 border-b border-ink-900/10">
      <div className="max-w-[1240px] mx-auto px-6 py-16 md:py-20">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-ink-muted"
          >
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.label}>
                {index > 0 && <span className="text-ink-muted/60 mx-2">/</span>}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-orange-600 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-ink-900">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <span className="eyebrow mt-6 inline-flex">{eyebrow}</span>
        )}
        <h1 className="h1-editorial mt-5 max-w-[22ch]">{title}</h1>
        {subtitle && (
          <p className="lead-editorial mt-5 max-w-[60ch]">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
