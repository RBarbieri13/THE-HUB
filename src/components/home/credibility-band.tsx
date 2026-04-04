"use client";

import { Award, Building2, Heart } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const INDICATORS = [
  {
    icon: Award,
    title: "Craig H. Neilsen Foundation",
    subtitle: "Funded by",
    description: "Proudly supported by a national leader in spinal cord injury research and programs.",
  },
  {
    icon: Building2,
    title: "United Spinal Association",
    subtitle: "Affiliated with",
    description: "Tennessee chapter of the nation's leading organization serving people with SCI.",
  },
  {
    icon: Heart,
    title: "Free to Recipients",
    subtitle: "Always",
    description: "Equipment, supplies, and services provided at absolutely no cost to qualified individuals.",
  },
] as const;

export function CredibilityBand() {
  return (
    <section className="bg-primary-dark py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
              Trusted. Funded. Free.
            </h2>
            <p className="text-white/85 text-lg mt-3 max-w-xl mx-auto">
              The Hub operates with full nonprofit accountability and national backing.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INDICATORS.map((item, i) => (
            <ScrollReveal key={item.title} animation="fade-up" delay={i * 120}>
              <div className="bg-white/10 backdrop-blur-sm rounded-sm p-8 text-center border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="bg-white/20 rounded-full p-4 inline-flex mb-5">
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <div className="text-white/75 text-xs uppercase tracking-[0.15em] font-bold mb-2">
                  {item.subtitle}
                </div>
                <div className="text-white text-xl font-bold font-heading mb-3">
                  {item.title}
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
