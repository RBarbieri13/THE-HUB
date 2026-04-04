import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-off-white flex items-center justify-center px-4 py-24">
      <div className="max-w-lg mx-auto text-center">
        <p
          className="text-accent font-display font-bold leading-none mb-6 select-none"
          style={{ fontSize: "clamp(6rem, 20vw, 10rem)" }}
          aria-hidden="true"
        >
          404
        </p>

        <h1 className="font-display text-2xl font-bold text-text-primary mb-3 tracking-tight">
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
