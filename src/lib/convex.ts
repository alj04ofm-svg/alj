/**
 * Convex client — browser-side only.
 * Configure NEXT_PUBLIC_CONVEX_URL in .env.local
 * (e.g. https://your-project.convex.cloud)
 *
 * When URL is not configured or is placeholder, all hooks gracefully fall back
 * to null/undefined so the app continues to work with local/mock data.
 */
import { makeFunctionReference } from "convex/server";

// Only use the URL if it's a real Convex deployment — placeholder won't connect
const rawUrl = process.env.NEXT_PUBLIC_CONVEX_URL ?? "";
const CONVEX_URL =
  rawUrl.startsWith("https://") && !rawUrl.includes("placeholder") && !rawUrl.includes("your_")
    ? rawUrl
    : "";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _convexClient: any = null;
function getClient() {
  if (!CONVEX_URL) return null;
  if (!_convexClient) {
    try {
      const { ConvexReactClient } = require("convex/react");
      _convexClient = new ConvexReactClient(CONVEX_URL);
    } catch { _convexClient = null; }
  }
  return _convexClient;
}

export const convexClient = { get client() { return getClient(); } };

// Stub API — run `npx convex dev` to replace with generated real types
export const api = {
  ideas: {
    generate: makeFunctionReference("ideas/generate"),
    list: makeFunctionReference("ideas/list"),
    create: makeFunctionReference("ideas/create"),
    updateStatus: makeFunctionReference("ideas/updateStatus"),
  },
  models: {
    list: makeFunctionReference("models/list"),
    ideas: makeFunctionReference("models/ideas/list"),
  },
  content: {
    enhance: makeFunctionReference("content/enhance"),
    upload: makeFunctionReference("content/upload"),
  },
  pipeline: {
    list: makeFunctionReference("pipeline/list"),
    sendToPipeline: makeFunctionReference("pipeline/sendToPipeline"),
    updateStatus: makeFunctionReference("pipeline/updateStatus"),
  },
};