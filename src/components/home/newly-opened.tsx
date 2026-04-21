"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function NewlyOpened() {
  return (
    <section className="bg-ink-950 text-white py-20 md:py-24 border-y border-white/10">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 items-start">
          <ScrollReveal animation="fade-right">
            <div>
              <span className="inline-flex items-center gap-2.5 font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.14em] text-orange-500 mb-5">
                <span className="w-7 h-[2px] bg-orange-500" />
                Just opened
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-[40px] md:text-[52px] font-medium leading-[1.06] tracking-[-0.02em] text-white">
                We opened our doors in{" "}
                <em className="text-orange-500 font-normal italic">
                  February&nbsp;2026
                </em>
                .
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-left" delay={150}>
            <div className="space-y-5 text-white/80 text-[17px] leading-[1.65] max-w-[60ch]">
              <p>
                The Hub is a brand-new program of the United Spinal Association
                of Tennessee. We&apos;re actively ramping up — accepting
                donations, building out inventory, and opening the closet to
                Tennesseans who need equipment right now.
              </p>
              <p>
                If you have gently-used adaptive equipment gathering dust, your
                donation directly stocks our shelves. If you need equipment,
                you&apos;re one of the first people we&apos;re here to serve.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                <Link
                  href="/donate-equipment"
                  className="group inline-flex items-center gap-2 px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-[15px] rounded-[6px] transition-colors"
                >
                  Donate to the closet
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/get-equipment"
                  className="inline-flex items-center px-6 py-3.5 bg-transparent border-[1.5px] border-white/40 hover:border-white text-white font-semibold text-[15px] rounded-[6px] transition-colors"
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
