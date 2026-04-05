/**
 * Convex client — browser-side only.
 * Configure NEXT_PUBLIC_CONVEX_URL in .env.local
 * (e.g. https://your-project.convex.cloud)
 */

import { ConvexReactClient } from "convex/react";
import { api } from "@/convex/_generated/api";

// Only instantiate with a real URL — placeholder crashes ConvexReactClient
const rawUrl = process.env.NEXT_PUBLIC_CONVEX_URL ?? "";

export const convexClient =
  rawUrl.startsWith("https://") && !rawUrl.includes("placeholder")
    ? new ConvexReactClient(rawUrl)
    : null as unknown as ConvexReactClient<Record<string, never>>;

export { api };
