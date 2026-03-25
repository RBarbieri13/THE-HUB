import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white via-white to-primary/5 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md animate-fade-in">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary-dark text-sm font-semibold mb-8 hover:text-[#166D7D]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="flex justify-center mb-6">
          <Image
            src="/images/logos/logo-stacked.png"
            alt="The Hub — United Spinal Association of Tennessee"
            width={140}
            height={70}
            priority
          />
        </div>

        {children}
      </div>
    </div>
  );
}
