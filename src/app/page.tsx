import { Hero } from "@/components/home/hero";
import { NewlyOpened } from "@/components/home/newly-opened";
import { ProblemSection } from "@/components/home/problem-section";
import { CTATrio } from "@/components/home/cta-trio";
import { HowItWorksPreview } from "@/components/home/how-it-works-preview";
import { PhotoSection } from "@/components/home/photo-section";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export default function HomePage() {
  return (
    <>
      <Hero />
      <NewlyOpened />
      <ProblemSection />
      <SectionWrapper bg="cream">
        <CTATrio />
      </SectionWrapper>
      <SectionWrapper bg="white">
        <HowItWorksPreview />
      </SectionWrapper>
      <SectionWrapper bg="cream">
        <PhotoSection />
      </SectionWrapper>
    </>
  );
}
