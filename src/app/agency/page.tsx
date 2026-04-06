"use client";

import { useState } from "react";
import {
  AgencyDashboardLayout,
  AgencyLanding,
  AgencySchedule,
  ChatterOnboarding,
  MarketingOnboarding,
  ModelRequests,
  ShiftTracker,
  ContentToModels,
  AgencyAnalytics,
  ModelManagement,
  type AgencyView,
} from "@/components/agency";

export default function AgencyPage() {
  const [agencyView, setAgencyView] = useState<AgencyView>("landing");

  return (
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
  );
}
