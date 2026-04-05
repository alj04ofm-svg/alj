import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";

// POST /api/drive/configure
// Saves Drive tokens + folder ID for a model. Called from Settings page after OAuth callback.

export async function POST(req: NextRequest) {
  try {
    const { modelId, tokens, folderId } = await req.json();

    if (!modelId || !tokens) {
      return NextResponse.json({ error: "modelId and tokens required" }, { status: 400 });
    }

    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl || convexUrl === "your_convex_deployment_url_here") {
      return NextResponse.json({ error: "NEXT_PUBLIC_CONVEX_URL not configured" }, { status: 500 });
    }

    const convex = new ConvexHttpClient(convexUrl);

    await (convex.mutation as (name: string, args: object) => Promise<unknown>)("models/connectDrive", {
      modelId,
      tokens,
      folderId: folderId ?? "",
    });

    return NextResponse.json({ success: true, modelId, folderId });
  } catch (err) {
    console.error("[/api/drive/configure]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// GET /api/drive/configure?modelId=xxx
// Returns Drive connection status for a model.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const modelId = searchParams.get("modelId");

  if (!modelId) {
    return NextResponse.json({ error: "modelId required" }, { status: 400 });
  }

  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl || convexUrl === "your_convex_deployment_url_here") {
    return NextResponse.json({ isConnected: false, folderId: null });
  }

  try {
    const convex = new ConvexHttpClient(convexUrl);
    const models = await (convex.query as (name: string, args: object) => Promise<unknown[]>)("models/list", {});
    const model = models.find((m: any) => m._id === modelId);
    return NextResponse.json({
      isConnected: !!(model as any)?.googleDriveTokens,
      folderId: (model as any)?.driveFolderId ?? null,
    });
  } catch {
    return NextResponse.json({ isConnected: false, folderId: null });
  }
}
