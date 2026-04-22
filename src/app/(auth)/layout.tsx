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
            src="/images/logos/logo-primary.png"
            alt="The Hub — Adaptive Equipment Closet, United Spinal of Tennessee"
            width={1254}
            height={1254}
            sizes="336px"
            className="w-[336px] h-[336px] object-contain"
            priority
          />
        </div>

        {children}
      </div>
    </div>
  );
}
