"use client";

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
import { useCategory } from "@/components/providers/CategoryProvider";
import { useState } from "react";
import {
  AgencyDashboardLayout,
  AgencyLanding,
  ChatterOnboarding,
  MarketingOnboarding,
  ModelRequests,
  NVTimeBot,
  ShiftTracker,
  ContentToModels,
  AgencyAnalytics,
  ModelManagement,
  AgencySchedule,
  type AgencyView,
} from "@/components/agency";

export default function Home() {
  const { category } = useCategory();
  const [agencyView, setAgencyView] = useState<AgencyView>("landing");

  const isAgencyMode = category === "agency";

  return (
    <main className="min-h-full bg-background text-foreground antialiased">
      {isAgencyMode && (
        <div style={{ height: "100vh", overflow: "hidden", borderBottom: "1px solid var(--nva-border)" }}>
          <AgencyDashboardLayout activeView={agencyView} onViewChange={setAgencyView}>
            {agencyView === "landing" && <AgencyLanding />}
            {agencyView === "schedule" && <AgencySchedule />}
            {agencyView === "chatter-onboarding" && <ChatterOnboarding />}
            {agencyView === "marketing-onboarding" && <MarketingOnboarding />}
            {agencyView === "model-requests" && <ModelRequests />}
            {agencyView === "shift-tracking" && <ShiftTracker />}
            {agencyView === "content-to-models" && <ContentToModels />}
            {agencyView === "analytics" && <AgencyAnalytics />}
            {agencyView === "model-management" && <ModelManagement />}
          </AgencyDashboardLayout>
        </div>
      )}
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
