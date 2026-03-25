import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ORG_NAME } from "@/lib/constants";
import { ChevronRight, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-dark min-h-[85vh] flex items-center overflow-hidden">
      <Image
        src="/images/stock/wheelchair-room.jpg"
        alt=""
        fill
        className="object-cover opacity-25"
        priority
      />
      {/* Multi-layer gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/40 to-transparent" />

      {/* Decorative accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-primary-dark" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Logo with glow */}
          <div className="relative mb-8">
            <div className="absolute inset-0 blur-3xl bg-white/10 rounded-full scale-150" />
            <Image
              src="/images/logos/logo-stacked.png"
              alt="The Hub logo"
              width={180}
              height={180}
              className="relative w-36 h-36 md:w-44 md:h-44 drop-shadow-2xl"
              priority
            />
          </div>

          {/* Title */}
          <h1 className="font-[family-name:var(--font-display)] text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-[1.0] tracking-[-0.04em]">
            The Hub
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-accent font-semibold mt-3 font-[family-name:var(--font-display)] tracking-wide">
            Adaptive Equipment Resource Center
          </p>

          {/* Org pill */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mt-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
            <span className="text-white/80 text-sm font-semibold tracking-wide">
              {ORG_NAME}
            </span>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/70 mt-8 max-w-xl font-[family-name:var(--font-paragraph)] leading-relaxed">
            Free refurbished wheelchairs, mobility devices, and adaptive
            equipment for people with spinal cord injuries and related
            disabilities.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link href="/get-equipment">
              <Button variant="primary" size="lg" className="group">
                Request Equipment
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/donate-equipment">
              <Button
                variant="outline"
                size="lg"
                className="text-white border-white/30 hover:bg-white hover:text-dark"
              >
                Donate Equipment
              </Button>
            </Link>
          </div>

          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-1.5 mt-8 text-white/50 hover:text-white text-sm font-semibold transition-colors no-underline"
          >
            Learn how the process works <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark to-transparent" />
    </section>
  );
}
