"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";

const STATS = [
  { number: "200+", label: "Items Distributed", sublabel: "across Tennessee" },
  { number: "5+", label: "Years of Service", sublabel: "since 2019" },
  { number: "10", label: "Equipment Types", sublabel: "in our inventory" },
  { number: "$0", label: "Cost to Recipients", sublabel: "always free" },
] as const;

export function ImpactStats() {
  return (
    <section className="bg-dark py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} animation="fade-up" delay={i * 100}>
              <div className="text-center p-6 rounded-sm border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                <div className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-accent leading-none">
                  {stat.number}
                </div>
                <div className="text-white font-semibold text-base mt-3">
                  {stat.label}
                </div>
                <div className="text-white/70 text-sm mt-1">
                  {stat.sublabel}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
