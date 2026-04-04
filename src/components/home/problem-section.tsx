"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { DollarSign, Clock, TrendingDown, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const CRISIS_STATS = [
  {
    icon: DollarSign,
    stat: "$15,000–$70,000",
    label: "Average cost of a power wheelchair",
    detail: "Out of reach for most families without insurance coverage",
  },
  {
    icon: Clock,
    stat: "6–12 Months",
    label: "Typical insurance approval wait",
    detail: "Leaving people without essential mobility equipment",
  },
  {
    icon: TrendingDown,
    stat: "40%",
    label: "Medicare claims denied",
    detail: "Complex documentation requirements exclude eligible people",
  },
  {
    icon: Users,
    stat: "300,000+",
    label: "Tennesseans with mobility disabilities",
    detail: "Many unable to access equipment through traditional channels",
  },
];

export function ProblemSection() {
  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Narrative */}
          <ScrollReveal animation="fade-right">
            <div>
              <div className="text-accent font-bold text-sm uppercase tracking-[0.15em] mb-4">
                The Problem
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary leading-tight">
                The Equipment Gap Is a <span className="text-accent">Crisis</span>
              </h2>
              <p className="text-text-body text-lg mt-6 leading-relaxed">
                Millions of Americans with spinal cord injuries and mobility
                disabilities need specialized equipment to live independently.
                But rising costs, insurance barriers, and long wait times leave
                too many people without the wheelchairs, walkers, and adaptive
                devices they need.
              </p>
              <p className="text-text-body text-lg mt-4 leading-relaxed">
                <strong className="text-text-primary">The Hub exists to close that gap.</strong>{" "}
                We collect, refurbish, and redistribute equipment to Tennesseans
                who need it — completely free of charge.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-8 text-primary-dark font-bold hover:text-accent transition-colors no-underline group"
              >
                Learn more about our mission
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Right: Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CRISIS_STATS.map((item, i) => (
              <ScrollReveal key={item.label} animation="fade-up" delay={i * 100}>
                <div className="p-6 rounded-sm border border-border bg-off-white hover:shadow-md hover:border-accent/30 transition-all duration-300 group">
                  <div className="bg-accent/10 rounded-full p-2.5 w-fit mb-4 group-hover:bg-accent/20 transition-colors">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div className="font-display text-2xl font-bold text-text-primary">
                    {item.stat}
                  </div>
                  <div className="text-text-primary text-sm font-semibold mt-1.5">
                    {item.label}
                  </div>
                  <div className="text-text-light text-sm mt-1">
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
