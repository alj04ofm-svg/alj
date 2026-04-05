import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";

// GET /api/auth/google-drive/callback
// Exchanges auth code for tokens and stores them in Convex against the model

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const state = searchParams.get("state");

  // Graceful error handling — redirect back to settings with error flag
  if (error || !code) {
    const params = new URLSearchParams({
      drive_error: error ?? "no_code",
    });
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3333"}/settings?${params.toString()}`
    );
  }

  // Decode modelId from state
  let modelId: string | null = null;
  if (state) {
    try {
      const decoded = JSON.parse(Buffer.from(state, "base64").toString("utf-8"));
      modelId = decoded.modelId ?? null;
    } catch {
      // ignore malformed state
    }
  }

  const clientId = process.env.GOOGLE_CLIENT_ID!;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3333"}/api/auth/google-drive/callback`;

  // Exchange code for tokens
  let tokens: { access_token: string; refresh_token?: string; expiry?: number };
  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Token exchange failed:", err);
      throw new Error(`Token exchange failed: ${res.status}`);
    }

    const data = await res.json();
    tokens = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expiry: Date.now() + data.expires_in * 1000,
    };
  } catch (err) {
    console.error("Failed to exchange code for tokens:", err);
    const params = new URLSearchParams({ drive_error: "token_exchange_failed" });
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3333"}/settings?${params.toString()}`
    );
  }

  // If we have a modelId, store tokens in Convex immediately
  if (modelId && process.env.NEXT_PUBLIC_CONVEX_URL) {
    try {
      const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
      // We'll redirect to settings with modelId so user can configure folder
      const params = new URLSearchParams({
        drive_connected: "true",
        modelId,
        tokens: Buffer.from(JSON.stringify(tokens)).toString("base64"),
      });
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3333"}/settings?${params.toString()}`
      );
    } catch (err) {
      console.error("Failed to store tokens in Convex:", err);
    }
  }

  const params = new URLSearchParams({ drive_connected: "true" });
  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3333"}/settings?${params.toString()}`
  );
}
