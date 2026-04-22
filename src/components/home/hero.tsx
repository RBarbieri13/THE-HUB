import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, HandHeart, Heart } from "lucide-react";
import { ORG_URL } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative bg-cream-50 border-b border-ink-900/10 overflow-hidden">
      {/* Decorative background watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_85%_-10%,#0C3940_0%,transparent_55%)]"
      />

      <div className="relative max-w-[1240px] mx-auto px-6 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <div className="flex flex-col">
            <a
              href={ORG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow hover:text-orange-800 transition-colors focus-visible:outline-2 focus-visible:outline-orange-600 focus-visible:outline-offset-4 rounded-sm"
            >
              United Spinal Association of Tennessee
              <ExternalLink className="h-3 w-3 opacity-70" aria-hidden="true" />
              <span className="sr-only">(opens in new tab)</span>
            </a>

            <h1 className="display-headline mt-6">
              Free adaptive equipment for <em>every</em> Tennessean who needs
              it.
            </h1>

            <p className="lead-editorial mt-7 max-w-[54ch]">
              The Hub is a new equipment closet from the United Spinal
              Association of Tennessee. We collect, refurbish, and redistribute
              wheelchairs, walkers, and mobility devices — so the wait for
              independence isn&apos;t measured in insurance cycles.
            </p>

            <div className="flex flex-wrap gap-3 mt-9">
              <Link
                href="/get-equipment"
                className="group inline-flex items-center gap-2 h-[52px] px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold text-[16px] rounded-md shadow-[0_6px_20px_rgba(238,115,47,0.35)] hover:shadow-[0_8px_26px_rgba(238,115,47,0.5)] transition-all focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:outline-offset-2"
              >
                <HandHeart className="h-5 w-5" aria-hidden="true" />
                Need Something
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link
                href="/donate-equipment"
                className="group inline-flex items-center gap-2 h-[52px] px-6 bg-teal-700 hover:bg-teal-800 text-white font-bold text-[16px] rounded-md transition-all focus-visible:outline-2 focus-visible:outline-teal-700 focus-visible:outline-offset-2"
              >
                <Heart className="h-5 w-5" aria-hidden="true" />
                Donate Equipment
              </Link>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-7 border-t border-ink-900/10">
              <div>
                <div className="font-[family-name:var(--font-display)] text-[28px] font-medium text-ink-900 leading-none tracking-[-0.02em]">
                  Feb 2026
                </div>
                <div className="text-[13px] text-ink-muted mt-1.5">
                  Newly opened
                </div>
              </div>
              <div>
                <div className="font-[family-name:var(--font-display)] text-[28px] font-medium text-ink-900 leading-none tracking-[-0.02em]">
                  $0
                </div>
                <div className="text-[13px] text-ink-muted mt-1.5">
                  Cost to recipients
                </div>
              </div>
              <div>
                <div className="font-[family-name:var(--font-display)] text-[28px] font-medium text-ink-900 leading-none tracking-[-0.02em]">
                  Statewide
                </div>
                <div className="text-[13px] text-ink-muted mt-1.5">
                  All 95 TN counties
                </div>
              </div>
            </div>
          </div>

          {/* Right column — editorial photo card */}
          <div className="relative lg:h-[540px] min-h-[400px]">
            {/* Main photo */}
            <div className="relative h-full rounded-[16px] overflow-hidden shadow-[0_20px_60px_-20px_rgba(12,57,64,0.35)] bg-ink-200">
              <Image
                src="/images/stock/wheelchair-walker.jpg"
                alt="A person using a rollator walker outdoors — adaptive equipment independence"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
                priority
              />
              {/* Gradient veil for legibility */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink-950/65 via-ink-950/10 to-transparent"
              />

              {/* Top-left chip */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-teal-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em]">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                Real equipment, real people
              </div>

              {/* Bottom overlay card */}
              <div className="absolute left-4 right-4 bottom-4 bg-white/95 backdrop-blur-sm rounded-[12px] shadow-[0_8px_24px_rgba(12,57,64,0.18)] p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-cream-50 flex items-center justify-center shrink-0 ring-1 ring-ink-900/10 overflow-hidden">
                  <Image
                    src="/images/logos/logo-primary.png"
                    alt=""
                    width={1254}
                    height={1254}
                    sizes="48px"
                    className="w-11 h-11 object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-orange-700">
                    Now accepting donations
                  </div>
                  <div className="font-[family-name:var(--font-display)] text-[17px] font-medium text-ink-900 leading-tight">
                    Help stock the closet →
                  </div>
                </div>
                <Link
                  href="/donate-equipment"
                  className="shrink-0 inline-flex items-center justify-center h-11 px-3 text-teal-700 hover:text-orange-600 font-semibold text-[14px] whitespace-nowrap rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-teal-700 focus-visible:outline-offset-2"
                  aria-label="Donate equipment"
                >
                  Donate
                </Link>
              </div>
            </div>

            {/* Small photo accent behind (desktop only) */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute -z-10 -bottom-5 -right-5 w-40 h-40 rounded-[16px] bg-gradient-to-br from-orange-500 to-orange-700 opacity-90"
            />
            <div
              aria-hidden="true"
              className="hidden lg:block absolute -z-10 -top-5 -left-5 w-32 h-32 rounded-[16px] border-2 border-teal-700/30"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
