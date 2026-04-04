"use client";

import { Quote } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const TESTIMONIALS = [
  {
    quote:
      "The Hub provided me with a power wheelchair within weeks of my discharge from the hospital. I don't know how I would have managed without their help. This equipment gave me my independence back.",
    name: "Marcus T.",
    role: "Equipment Recipient, Nashville",
  },
  {
    quote:
      "As an occupational therapist, I refer my SCI patients to The Hub regularly. The team is incredibly responsive and the equipment quality is excellent. It's made a real difference for patients who can't afford retail prices.",
    name: "Jennifer R., OTR/L",
    role: "Occupational Therapist, Vanderbilt",
  },
  {
    quote:
      "Donating my late husband's wheelchair felt meaningful because I knew it would help someone in Tennessee. The staff handled everything professionally and with great care.",
    name: "Sandra K.",
    role: "Equipment Donor, Memphis",
  },
] as const;

export function Testimonials() {
  return (
    <section className="bg-primary-dark py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-14">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-5">
              <Quote className="h-5 w-5 text-accent" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
              Stories From Our Community
            </h2>
            <p className="text-white/85 text-lg md:text-xl mt-4 max-w-2xl mx-auto leading-relaxed">
              Real impact. Real people. Hear from those whose lives The Hub has touched.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={t.name} animation="fade-up" delay={i * 120}>
              <div className="bg-white/[0.07] backdrop-blur-sm rounded-sm p-8 flex flex-col h-full border border-white/10 hover:bg-white/[0.12] transition-all duration-300 hover:-translate-y-1">
                <div className="text-accent text-5xl font-display leading-none mb-4">
                  &ldquo;
                </div>
                <p className="text-white/90 text-base md:text-lg leading-relaxed flex-1">
                  {t.quote}
                </p>
                <div className="mt-6 pt-5 border-t border-white/15">
                  <div className="font-bold text-white text-base">{t.name}</div>
                  <div className="text-accent/80 text-sm mt-1 font-medium">{t.role}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <p className="text-white/60 text-xs text-center mt-10">
          * Stories are representative of community experiences. Names changed for privacy.
        </p>
      </div>
    </section>
  );
}
