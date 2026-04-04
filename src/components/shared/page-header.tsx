import Link from "next/link";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  return (
    <>
      <section className="bg-primary-dark py-16 md:py-20 text-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary-dark/80" />
        <div className="max-w-7xl mx-auto px-6 relative">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav
              className="font-body text-sm text-primary/70"
              aria-label="Breadcrumb"
            >
              {breadcrumbs.map((crumb, index) => (
                <span key={crumb.label}>
                  {index > 0 && <span className="text-white/30 mx-1.5">›</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mt-4 tracking-[-0.025em]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl mt-3 text-white/85 leading-relaxed max-w-2xl">{subtitle}</p>
          )}
        </div>
      </section>
      <div className="h-1 bg-gradient-to-r from-accent via-primary to-transparent" />
    </>
  );
}
