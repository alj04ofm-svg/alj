"use client";
import { ConvexProvider as RealConvexProvider } from "convex/react";
import { convexClient } from "@/lib/convex";

export function ConvexProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = convexClient.client;
  if (!client) {
    // Convex not configured — render without provider (local/mock mode)
    return <>{children}</>;
  }
  return <RealConvexProvider client={client}>{children}</RealConvexProvider>;
}