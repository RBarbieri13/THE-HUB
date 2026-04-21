"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const STEPS = [
  {
    n: "01",
    title: "Tell us what you need",
    description:
      "Submit a short request form. Takes about 4 minutes. No insurance info required.",
  },
  {
    n: "02",
    title: "We match and prepare",
    description:
      "Our team reviews inventory, refurbishes as needed, and confirms fit within a few days.",
  },
  {
    n: "03",
    title: "You receive equipment",
    description:
      "Pick up in Nashville or schedule delivery anywhere in Tennessee. Always free.",
  },
];

export function HowItWorksPreview() {
  return (
    <div>
      <ScrollReveal animation="fade-up">
        <div className="max-w-3xl">
          <span className="eyebrow">How it works</span>
          <h2 className="h2-editorial mt-5">
            Three steps between a request and a wheelchair.
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
        {STEPS.map((step, i) => (
          <ScrollReveal key={step.n} animation="fade-up" delay={i * 120}>
            <div className="pt-6 border-t-2 border-ink-900">
              <div className="font-[family-name:var(--font-display)] text-[40px] font-medium text-orange-600 leading-none tracking-[-0.03em]">
                {step.n}
              </div>
              <h3 className="h3-editorial mt-3">{step.title}</h3>
              <p className="mt-3 text-ink-body text-[15px] leading-[1.6]">
                {step.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal animation="fade-up" delay={400}>
        <div className="mt-12">
          <Link
            href="/how-it-works"
            className="group inline-flex items-center gap-2 text-teal-700 hover:text-orange-600 font-semibold border-b-2 border-current pb-0.5 transition-colors"
          >
            View full process details
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
