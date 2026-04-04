"use client";

import Link from "next/link";
import { ClipboardList, Settings, PackageCheck, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const steps = [
  {
    number: 1,
    icon: ClipboardList,
    title: "Tell Us What You Need",
    description:
      "Submit a request through our simple online form. Let us know what equipment would help improve your daily life.",
  },
  {
    number: 2,
    icon: Settings,
    title: "We Match & Prepare",
    description:
      "Our team reviews available inventory, inspects equipment quality, and prepares the right match for you.",
  },
  {
    number: 3,
    icon: PackageCheck,
    title: "You Receive Equipment",
    description:
      "Pick up from our Nashville location or arrange delivery. Always free — no cost, no strings attached.",
  },
] as const;

export function HowItWorksPreview() {
  return (
    <div>
      <ScrollReveal animation="fade-up">
        <div className="text-center mb-14">
          <div className="section-divider mx-auto mb-5" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
            How It Works
          </h2>
          <p className="text-text-body text-lg mt-3 max-w-lg mx-auto">
            Three simple steps to getting the equipment you need.
          </p>
        </div>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        {/* Connecting line (desktop only) */}
        <div className="hidden md:block absolute top-10 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-accent/30 via-accent to-accent/30" />

        {steps.map((step, i) => (
          <ScrollReveal key={step.number} animation="fade-up" delay={i * 150}>
            <div className="text-center relative">
              <div className="relative z-10 w-20 h-20 rounded-full bg-accent text-white flex items-center justify-center mx-auto shadow-lg shadow-accent/20">
                <step.icon className="h-8 w-8" />
              </div>
              <div className="text-accent font-bold text-sm uppercase tracking-wider mt-5 mb-2">
                Step {step.number}
              </div>
              <h4 className="font-heading text-xl font-bold text-text-primary">
                {step.title}
              </h4>
              <p className="text-text-body mt-3 leading-relaxed">{step.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal animation="fade-up" delay={500}>
        <div className="text-center mt-12">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-primary-dark font-semibold hover:text-accent transition-colors no-underline group"
          >
            View Full Process Details
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
