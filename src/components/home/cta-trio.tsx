"use client";

import Link from "next/link";
import { Armchair, Gift, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const cards = [
  {
    icon: Armchair,
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    borderColor: "border-t-4 border-t-accent",
    title: "Need Equipment?",
    description:
      "Our closet provides refurbished mobility equipment at no cost to eligible Tennesseans.",
    buttonLabel: "Request Equipment",
    buttonVariant: "primary" as const,
    href: "/get-equipment",
  },
  {
    icon: Gift,
    iconBg: "bg-primary-dark/10",
    iconColor: "text-primary-dark",
    borderColor: "border-t-4 border-t-primary-dark",
    title: "Want to Donate?",
    description:
      "Your donated equipment can help someone regain independence and mobility.",
    buttonLabel: "Donate Equipment",
    buttonVariant: "secondary" as const,
    href: "/donate-equipment",
  },
  {
    icon: Search,
    iconBg: "bg-primary/10",
    iconColor: "text-primary-dark",
    borderColor: "border-t-4 border-t-primary",
    title: "Browse Inventory",
    description:
      "See what's currently available in our closet. Create an account for full access.",
    buttonLabel: "View Inventory",
    buttonVariant: "outline" as const,
    href: "/inventory",
  },
] as const;

export function CTATrio() {
  return (
    <div>
      <ScrollReveal animation="fade-up">
        <div className="text-center mb-12">
          <div className="section-divider mx-auto mb-5" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
            How Can We Help?
          </h2>
          <p className="text-text-body text-lg mt-3 max-w-xl mx-auto">
            Whether you need equipment, want to give back, or are looking for a
            loved one — we&apos;re here.
          </p>
        </div>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <ScrollReveal key={card.title} animation="fade-up" delay={i * 120}>
            <Card hoverable className={`${card.borderColor} group h-full`}>
              <CardContent className="p-10 text-center flex flex-col items-center h-full">
                <div className={`${card.iconBg} rounded-full p-5 mb-5 transition-transform duration-300 group-hover:scale-110`}>
                  <card.icon className={`h-10 w-10 ${card.iconColor}`} />
                </div>
                <h3 className="font-heading text-2xl font-bold mt-1">
                  {card.title}
                </h3>
                <p className="text-text-body text-base mt-3 flex-1">{card.description}</p>
                <Link href={card.href} className="mt-8 no-underline">
                  <Button variant={card.buttonVariant} className="group/btn">
                    {card.buttonLabel}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
