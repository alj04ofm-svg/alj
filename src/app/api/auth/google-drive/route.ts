import { NextResponse } from "next/server";

// GET /api/auth/google-drive — redirect to Google OAuth consent screen

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const modelId = searchParams.get("modelId");
  const state = modelId ? Buffer.from(JSON.stringify({ modelId })).toString("base64") : "";

  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: "GOOGLE_CLIENT_ID not set in .env.local" },
      { status: 500 }
    );
  }

  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3333"}/api/auth/google-drive/callback`;
  const scopes = [
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/userinfo.email",
  ].join(" ");

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: scopes,
    access_type: "offline",
    prompt: "consent",
    state,
  });

  return NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  );
}
