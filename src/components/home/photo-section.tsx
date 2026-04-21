"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const PHOTOS = [
  {
    src: "/images/stock/wheelchair-room.jpg",
    alt: "Equipment storage area at The Hub closet",
    caption: "Refurbishment bay",
  },
  {
    src: "/images/stock/wheelchair-home.jpg",
    alt: "Power wheelchair user navigating independently at home",
    caption: "Equipment in use",
  },
  {
    src: "/images/stock/wheelchair-walker.jpg",
    alt: "Person using a rollator walker outdoors",
    caption: "Mobility independence",
  },
  {
    src: "/images/stock/wheelchair-senior.jpg",
    alt: "Senior in a manual wheelchair on a sidewalk",
    caption: "Statewide reach",
  },
];

export function PhotoSection() {
  return (
    <div>
      <ScrollReveal animation="fade-up">
        <div className="max-w-3xl">
          <span className="eyebrow">What we&apos;re building</span>
          <h2 className="h2-editorial mt-5">
            A community resource for Tennessee — built by the community it
            serves.
          </h2>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="scale-in" delay={100}>
        <div className="relative aspect-[16/7] rounded-[12px] overflow-hidden mt-10 shadow-[0_8px_20px_rgba(12,57,64,0.08)]">
          <Image
            src="/images/stock/community-event.jpg"
            alt="United Spinal Association of Tennessee community members at an event"
            fill
            className="object-cover object-center hover:scale-[1.02] transition-transform duration-700"
            sizes="100vw"
          />
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-[6px] px-3 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-ink-700">
            USAT Community
          </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
        {PHOTOS.map((photo, i) => (
          <ScrollReveal key={photo.src} animation="fade-up" delay={i * 100}>
            <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden group">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-white drop-shadow-md">
                {photo.caption}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
