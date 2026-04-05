"use client";
import { ConvexProvider as RealConvexProvider } from "convex/react";
import { convexClient } from "@/lib/convex";

export function ConvexProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // If Convex URL is not configured, render without Convex (local/mock mode)
  if (!convexClient) {
    return <>{children}</>;
  }
  return <RealConvexProvider client={convexClient}>{children}</RealConvexProvider>;
}
