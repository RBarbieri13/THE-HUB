import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { EquipmentMark } from "@/components/shared/equipment-mark";

export function Hero() {
  return (
    <section className="relative bg-cream-50 border-b border-ink-900/10 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 py-24 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-stretch">
          {/* Left column */}
          <div className="flex flex-col justify-center">
            <span className="eyebrow">
              United Spinal Association of Tennessee
            </span>

            <h1 className="display-headline mt-6">
              Free adaptive equipment for <em>every</em> Tennessean who needs
              it.
            </h1>

            <p className="lead-editorial mt-7 max-w-[54ch]">
              The Hub is a new equipment closet from the United Spinal
              Association of Tennessee. We collect, refurbish, and redistribute
              wheelchairs, walkers, and mobility devices — so the wait for
              independence isn&apos;t measured in insurance cycles.
            </p>

            <div className="flex flex-wrap gap-3 mt-9">
              <Link
                href="/get-equipment"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-[15px] rounded-[6px] transition-colors shadow-sm"
              >
                Request Equipment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/donate-equipment"
                className="inline-flex items-center px-6 py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-[15px] rounded-[6px] transition-colors"
              >
                Donate Equipment
              </Link>
            </div>

            {/* Three fact rail */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-7 border-t border-ink-900/10">
              <div>
                <div className="font-[family-name:var(--font-display)] text-[28px] font-medium text-ink-900 leading-none tracking-[-0.02em]">
                  Feb 2026
                </div>
                <div className="text-[13px] text-ink-muted mt-1.5">
                  Newly opened
                </div>
              </div>
              <div>
                <div className="font-[family-name:var(--font-display)] text-[28px] font-medium text-ink-900 leading-none tracking-[-0.02em]">
                  $0
                </div>
                <div className="text-[13px] text-ink-muted mt-1.5">
                  Cost to recipients
                </div>
              </div>
              <div>
                <div className="font-[family-name:var(--font-display)] text-[28px] font-medium text-ink-900 leading-none tracking-[-0.02em]">
                  Statewide
                </div>
                <div className="text-[13px] text-ink-muted mt-1.5">
                  All 95 TN counties
                </div>
              </div>
            </div>
          </div>

          {/* Right column — editorial art panel */}
          <div className="relative">
            <div className="relative w-full h-full min-h-[420px] rounded-[16px] overflow-hidden bg-teal-700">
              {/* Striped pattern layer */}
              <div className="ph-stripe absolute inset-0" />

              {/* Equipment mark illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <EquipmentMark
                  kind="wheelchair"
                  tone="orange"
                  className="w-[55%] max-w-[320px]"
                />
              </div>

              {/* Featured badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-2 bg-teal-900/90 text-white px-3 py-1.5 rounded-full font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em]">
                  Featured · Manual Wheelchair
                </span>
              </div>

              {/* Card overlay */}
              <div className="absolute left-4 right-4 bottom-4 bg-white rounded-[10px] shadow-[0_8px_20px_rgba(12,57,64,0.08)] p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                  <Image
                    src="/images/logos/logo-badge.png"
                    alt=""
                    width={40}
                    height={40}
                    className="w-9 h-9"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-orange-700">
                    New to the closet
                  </div>
                  <div className="font-[family-name:var(--font-display)] text-[18px] font-medium text-ink-900 truncate">
                    Accepting donations now
                  </div>
                </div>
                <Link
                  href="/donate-equipment"
                  className="shrink-0 text-teal-700 hover:text-orange-600 font-semibold text-[14px] whitespace-nowrap border-b-2 border-current pb-0.5 transition-colors"
                >
                  Donate →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
