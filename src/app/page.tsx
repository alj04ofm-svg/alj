import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { SocialProof } from "@/components/home/SocialProof";
import { WhoItsFor } from "@/components/home/WhoItsFor";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { ServiceTiers } from "@/components/home/ServiceTiers";
import { ROISection } from "@/components/home/ROISection";
import { StatsSection } from "@/components/home/StatsSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <main className="min-h-full bg-background text-foreground antialiased">
      <Navigation />

      <Hero />
      <SocialProof />
      <WhoItsFor />
      <HowItWorks />
      <FeatureGrid />
      <ServiceTiers />
      <ROISection />
      <StatsSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
