"use client";

import { useState } from "react";
import {
  AgencyDashboardLayout,
  AgencyLanding,
  AgencySchedule,
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
        {agencyView === "shift-tracking" && <ShiftTracker />}
        {agencyView === "content-to-models" && <ContentToModels />}
        {agencyView === "model-requests" && <ModelRequests />}
        {agencyView === "analytics" && <AgencyAnalytics />}
        {agencyView === "model-management" && <ModelManagement />}
      </AgencyDashboardLayout>
    </div>
  );
}
