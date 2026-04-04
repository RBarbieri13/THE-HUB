"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const STOCK_PHOTOS = [
  {
    src: "/images/stock/wheelchair-room.jpg",
    alt: "Wheelchair storage area at The Hub",
  },
  {
    src: "/images/stock/wheelchair-home.jpg",
    alt: "Power wheelchair user navigating independently",
  },
  {
    src: "/images/stock/wheelchair-walker.jpg",
    alt: "Person using a rollator walker outdoors",
  },
  {
    src: "/images/stock/wheelchair-senior.jpg",
    alt: "Senior in a manual wheelchair on a sidewalk",
  },
];

export function PhotoSection() {
  return (
    <div>
      <ScrollReveal animation="fade-up">
        <div className="text-center mb-10">
          <div className="section-divider mx-auto mb-5" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
            Our Community
          </h2>
          <p className="text-text-body text-lg mt-3 max-w-2xl mx-auto">
            Real people. Real impact. See who we serve and the equipment we provide
            across Tennessee.
          </p>
        </div>
      </ScrollReveal>
      <ScrollReveal animation="scale-in">
        <div className="relative aspect-[16/7] rounded-sm overflow-hidden mb-2 shadow-lg">
          <Image
            src="/images/stock/community-event.jpg"
            alt="United Spinal Association of Tennessee community members gathered together at a Hub event — many in wheelchairs"
            fill
            className="object-cover object-center hover:scale-[1.02] transition-transform duration-700"
            sizes="100vw"
          />
        </div>
        <p className="text-text-light text-sm text-center mb-8 italic">
          United Spinal Association of Tennessee — Community Members
        </p>
      </ScrollReveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STOCK_PHOTOS.map((photo, i) => (
          <ScrollReveal key={photo.src} animation="fade-up" delay={i * 100}>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-md group">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 px-3 py-2">
                <p className="text-white text-xs font-medium drop-shadow-md leading-snug">{photo.alt}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
