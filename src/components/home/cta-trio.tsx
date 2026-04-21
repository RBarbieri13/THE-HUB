"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { EquipmentMark } from "@/components/shared/equipment-mark";

const CARDS = [
  {
    kind: "wheelchair" as const,
    tone: "teal" as const,
    phStripe: "ph-stripe",
    eyebrow: "For recipients",
    title: "Need equipment?",
    description:
      "Request refurbished mobility equipment from our closet at no cost. Tennessee residents eligible.",
    cta: "Request Equipment",
    href: "/get-equipment",
    ctaClass: "bg-orange-600 hover:bg-orange-700 text-white",
  },
  {
    kind: "walker" as const,
    tone: "orange" as const,
    phStripe: "ph-stripe ph-stripe--orange",
    eyebrow: "For donors",
    title: "Have equipment to give?",
    description:
      "Your donated wheelchair, walker, or adaptive device can change someone's life. We're building our inventory now.",
    cta: "Donate Equipment",
    href: "/donate-equipment",
    ctaClass: "bg-teal-700 hover:bg-teal-800 text-white",
  },
  {
    kind: "cushion" as const,
    tone: "cream" as const,
    phStripe: "ph-stripe ph-stripe--cream",
    eyebrow: "For partners",
    title: "Referring someone?",
    description:
      "Therapists, case managers, and clinicians: submit referrals on behalf of the people you serve.",
    cta: "Start a Referral",
    href: "/get-equipment",
    ctaClass: "bg-ink-900 hover:bg-ink-800 text-white",
  },
];

export function CTATrio() {
  return (
    <div>
      <ScrollReveal animation="fade-up">
        <div className="max-w-3xl">
          <span className="eyebrow">Three ways in</span>
          <h2 className="h2-editorial mt-5">How can we help?</h2>
          <p className="lead-editorial mt-5 max-w-[62ch]">
            Whether you need equipment, have equipment to give, or are
            referring someone in need — here&apos;s where to start.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {CARDS.map((card, i) => (
          <ScrollReveal key={card.title} animation="fade-up" delay={i * 120}>
            <div className="group bg-white border border-ink-900/10 rounded-[10px] overflow-hidden h-full flex flex-col hover:shadow-md hover:border-ink-900/20 hover:-translate-y-0.5 transition-all duration-300">
              <div className={`${card.phStripe} aspect-[5/3] relative flex items-center justify-center`}>
                <EquipmentMark kind={card.kind} tone={card.tone} className="w-[55%] max-w-[180px]" />
              </div>
              <div className="p-7 flex flex-col flex-1">
                <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-orange-700 mb-2.5">
                  {card.eyebrow}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[24px] font-medium text-ink-900 leading-[1.15] tracking-[-0.015em]">
                  {card.title}
                </h3>
                <p className="mt-3 text-ink-body text-[15px] leading-[1.55] flex-1">
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className={`group/btn mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 font-semibold text-[15px] rounded-[6px] transition-colors ${card.ctaClass}`}
                >
                  {card.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
