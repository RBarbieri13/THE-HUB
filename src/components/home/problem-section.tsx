"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const CRISIS_STATS = [
  {
    stat: "$15K–$70K",
    label: "Cost of a power wheelchair",
    detail: "Out of reach without insurance coverage.",
  },
  {
    stat: "6–12 mo",
    label: "Typical insurance wait",
    detail: "People go months without essential mobility.",
  },
  {
    stat: "40%",
    label: "Medicare claims denied",
    detail: "Documentation hurdles exclude eligible people.",
  },
  {
    stat: "300K+",
    label: "Tennesseans affected",
    detail: "Many unable to access equipment traditionally.",
  },
];

export function ProblemSection() {
  return (
    <section className="bg-white py-24 md:py-28 border-t border-ink-900/10">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-20 items-start">
          <ScrollReveal animation="fade-right">
            <div>
              <span className="eyebrow">The Problem</span>
              <h2 className="h2-editorial mt-5">
                Insurance shouldn&apos;t decide who gets to move.
              </h2>
              <div className="mt-7 space-y-5 text-ink-body text-[17px] leading-[1.65]">
                <p>
                  Tennesseans with spinal cord injuries and mobility
                  disabilities often wait months — sometimes years — for a
                  wheelchair. Insurance approvals are slow, denials are common,
                  and out-of-pocket prices are out of reach for most families.
                </p>
                <p>
                  Meanwhile, perfectly functional equipment sits unused in
                  closets, garages, and clinics across the state. The Hub
                  exists to close that gap.
                </p>
              </div>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 mt-8 text-teal-700 hover:text-orange-600 font-semibold border-b-2 border-current pb-0.5 transition-colors"
              >
                Learn more about our mission
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CRISIS_STATS.map((item, i) => (
              <ScrollReveal key={item.label} animation="fade-up" delay={i * 80}>
                <div className="bg-cream-50 border border-ink-900/10 rounded-[10px] p-6 h-full hover:shadow-md hover:border-orange-600/30 transition-all duration-300">
                  <div className="data-num text-[34px] md:text-[38px]">
                    {item.stat}
                  </div>
                  <div className="text-ink font-semibold mt-2 text-[16px]">
                    {item.label}
                  </div>
                  <div className="text-ink-muted text-[14px] mt-1.5 leading-[1.5]">
                    {item.detail}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
