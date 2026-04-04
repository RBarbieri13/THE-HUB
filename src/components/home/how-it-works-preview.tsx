"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const steps = [
  {
    number: 1,
    title: "Tell Us What You Need",
    description:
      "Submit a request through our simple online form. Let us know what equipment would help improve your daily life.",
    image: "/images/stock/wheelchair-room.jpg",
    imageAlt: "Equipment room with wheelchairs and adaptive devices ready for distribution",
  },
  {
    number: 2,
    title: "We Match & Prepare",
    description:
      "Our team reviews available inventory, inspects equipment quality, and prepares the right match for you.",
    image: "/images/stock/wheelchair-home.jpg",
    imageAlt: "Wheelchair being prepared and inspected for a new recipient",
  },
  {
    number: 3,
    title: "You Receive Equipment",
    description:
      "Pick up from our Nashville location or arrange delivery. Always free — no cost, no strings attached.",
    image: "/images/stock/wheelchair-walker.jpg",
    imageAlt: "Person using adaptive equipment outdoors, enjoying independence",
  },
] as const;

export function HowItWorksPreview() {
  return (
    <div>
      <ScrollReveal animation="fade-up">
        <div className="text-center mb-16">
          <div className="section-divider mx-auto mb-5" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            How It Works
          </h2>
          <p className="text-text-body text-lg md:text-xl mt-4 max-w-xl mx-auto leading-relaxed">
            Three simple steps to getting the equipment you need — completely free.
          </p>
        </div>
      </ScrollReveal>

      <div className="space-y-16 md:space-y-0 md:grid md:grid-cols-3 md:gap-10">
        {steps.map((step, i) => (
          <ScrollReveal key={step.number} animation="fade-up" delay={i * 150}>
            <div className="group">
              {/* Image */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-6 shadow-md">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
                {/* Step badge */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold shadow-lg">
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div>
                <p className="text-accent font-bold text-sm uppercase tracking-wider mb-2">
                  Step {step.number}
                </p>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-text-body text-base leading-relaxed">{step.description}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal animation="fade-up" delay={500}>
        <div className="text-center mt-14">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-primary-dark text-lg font-semibold hover:text-accent transition-colors no-underline group"
          >
            View Full Process Details
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
