import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-off-white flex items-center justify-center px-4 py-24 overflow-hidden">
      {/* Decorative background blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
        }}
      />

      <div className="animate-fade-in-up relative z-10 max-w-lg mx-auto text-center">
        {/* Large 404 display number */}
        <p
          className="gradient-text font-[family-name:var(--font-display)] font-bold leading-none mb-6 select-none"
          style={{ fontSize: "clamp(6rem, 20vw, 10rem)" }}
          aria-hidden="true"
        >
          404
        </p>

        {/* Decorative divider */}
        <div className="section-divider mx-auto mb-6" aria-hidden="true" />

        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-text-primary mb-3 tracking-tight">
          Page not found
        </h1>

        <p className="text-text-body max-w-sm mx-auto mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button variant="primary" size="md">
              Go Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="md">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
