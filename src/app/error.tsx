"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-off-white min-h-[60vh] flex items-center justify-center px-4">
      <div className="animate-fade-in max-w-lg mx-auto text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-16 w-16 text-accent" strokeWidth={1.5} />
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-text-primary mb-3">
          Something went wrong
        </h1>
        <p className="text-text-body max-w-md mx-auto mb-8 leading-relaxed">
          We encountered an unexpected error. Please try again or contact us if
          the problem persists.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="primary" onClick={reset}>
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
