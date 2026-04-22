"use client";

import Link from "next/link";
import { ArrowRight, DollarSign, Clock, FileX, Users } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const CRISIS_STATS = [
  {
    icon: DollarSign,
    stat: "$15K–$70K",
    label: "Cost of a power wheelchair",
    detail: "Out of reach without insurance coverage.",
  },
  {
    icon: Clock,
    stat: "6–12 mo",
    label: "Typical insurance wait",
    detail: "People go months without essential mobility.",
  },
  {
    icon: FileX,
    stat: "40%",
    label: "Medicare claims denied",
    detail: "Documentation hurdles exclude eligible people.",
  },
  {
    icon: Users,
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
                className="group inline-flex items-center gap-2 mt-8 text-teal-700 hover:text-orange-600 font-semibold border-b-2 border-current pb-0.5 transition-colors focus-visible:outline-2 focus-visible:outline-teal-700 focus-visible:outline-offset-4"
              >
                Learn more about our mission
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CRISIS_STATS.map((item, i) => (
              <ScrollReveal key={item.label} animation="fade-up" delay={i * 80}>
                <article className="group relative bg-cream-50 border border-ink-900/10 rounded-[12px] p-6 h-full hover:shadow-[0_8px_24px_rgba(12,57,64,0.08)] hover:border-orange-600/40 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-600/10 text-orange-700 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <item.icon className="h-4.5 w-4.5" strokeWidth={2.25} aria-hidden="true" />
                  </div>
                  <div className="data-num text-[32px] md:text-[36px] mt-4">
                    {item.stat}
                  </div>
                  <div className="text-ink-900 font-semibold mt-1.5 text-[16px]">
                    {item.label}
                  </div>
                  <div className="text-ink-muted text-[14px] mt-1.5 leading-[1.5]">
                    {item.detail}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
