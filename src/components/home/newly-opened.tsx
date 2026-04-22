"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { ORG_URL } from "@/lib/constants";

export function NewlyOpened() {
  return (
    <section
      aria-labelledby="newly-opened-heading"
      className="relative bg-ink-950 text-white py-20 md:py-24 border-y border-white/10 overflow-hidden"
    >
      {/* Decorative layered gradient + grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(238,115,47,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(30,137,157,0.15),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[size:44px_44px]"
      />

      <div className="relative max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 items-start">
          <ScrollReveal animation="fade-right">
            <div>
              <span className="inline-flex items-center gap-2.5 font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.14em] text-orange-400 mb-5">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                Just opened
              </span>
              <h2
                id="newly-opened-heading"
                className="font-[family-name:var(--font-display)] text-[40px] md:text-[52px] font-medium leading-[1.06] tracking-[-0.02em] text-white"
              >
                We opened our doors in{" "}
                <em className="text-orange-500 font-normal italic">
                  February&nbsp;2026
                </em>
                .
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-left" delay={150}>
            <div className="space-y-5 text-white/85 text-[17px] leading-[1.65] max-w-[60ch]">
              <p>
                The Hub is a brand-new program of the{" "}
                <a
                  href={ORG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-baseline gap-1 text-white underline decoration-orange-500/60 underline-offset-4 decoration-2 hover:decoration-orange-400 hover:decoration-2 transition-colors focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:outline-offset-2 rounded-sm"
                >
                  United Spinal Association of Tennessee
                  <ExternalLink className="h-3 w-3 opacity-70 self-center" aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </a>
                . We&apos;re actively ramping up — accepting donations,
                building out inventory, and opening the closet to Tennesseans
                who need equipment right now.
              </p>
              <p>
                If you have gently-used adaptive equipment gathering dust, your
                donation directly stocks our shelves. If you need equipment,
                you&apos;re one of the first people we&apos;re here to serve.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                <Link
                  href="/donate-equipment"
                  className="group inline-flex items-center gap-2 h-12 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold text-[15px] rounded-md transition-all focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:outline-offset-2"
                >
                  Donate to the closet
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <Link
                  href="/get-equipment"
                  className="inline-flex items-center h-12 px-6 bg-transparent border-[1.5px] border-white/40 hover:border-white hover:bg-white/5 text-white font-bold text-[15px] rounded-md transition-all focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                >
                  Request something
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
