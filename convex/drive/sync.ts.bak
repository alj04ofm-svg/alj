"use node";
import { internalMutation, internalQuery } from "../_generated/server.js";
import { v } from "convex/values";

// ─── Internal helpers (re-use token logic from index.ts inline) ───────────────

async function getValidTokens(
  storedTokensJson: string | null
): Promise<{ access_token: string; refresh_token?: string; expiry: number } | null> {
  if (!storedTokensJson) return null;
  const tokens = JSON.parse(storedTokensJson) as { access_token: string; refresh_token?: string; expiry: number };
  if (tokens.expiry > Date.now() + 60_000) return tokens;

  if (!tokens.refresh_token) return null;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: tokens.refresh_token,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return { access_token: data.access_token, refresh_token: tokens.refresh_token, expiry: Date.now() + data.expires_in * 1000 };
}

// ─── Scheduled function — runs every 15 minutes ──────────────────────────────
import { schedule } from "convex/server/cron";

/**
 * autoSync — scheduled function. Must be registered in convex.config.ts.
 * Runs via: npx convex run drive/sync:autoSync --tail
 *
 * For each model with a Drive folder configured:
 * 1. List video files in the folder
 * 2. Filter to files not yet in clips table
 * 3. Download each new file
 * 4. Trigger Gemini analysis
 */
export const autoSync = schedule({
  cron: "*/15 * * * *", // every 15 minutes
  handler: async (ctx) => {
    // Find all models with Drive configured
    const models = await ctx.db.query("models").collect();

    for (const model of models) {
      const tokensJson = (model as any).googleDriveTokens as string | null;
      const folderId = (model as any).driveFolderId as string | null;

      if (!tokensJson || !folderId) continue;

      const tokens = await getValidTokens(tokensJson);
      if (!tokens) {
        console.warn(`No valid tokens for model ${model._id} (${(model as any).name}), skipping sync`);
        continue;
      }

      // Refresh tokens in DB if they changed
      if (tokens.expiry !== JSON.parse(tokensJson).expiry) {
        await ctx.db.patch(model._id, { googleDriveTokens: JSON.stringify(tokens) });
      }

      let driveFiles: any[] = [];
      try {
        driveFiles = await listDriveFiles(tokens.access_token, folderId);
      } catch (err) {
        console.error(`Failed to list Drive files for model ${model._id}:`, err);
        continue;
      }

      if (driveFiles.length === 0) continue;

      // Find existing clips for this model
      const existingClips = await ctx.db
        .query("clips")
        .filter((q) => q.eq(q.field("modelId"), model._id as any))
        .collect();

      const existingDriveIds = new Set(
        existingClips.map((c) => (c as any).driveFileId).filter(Boolean)
      );

      const newFiles = driveFiles.filter((f) => !existingDriveIds.has(f.id));

      for (const file of newFiles) {
        try {
          // Download file
          const url = `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`;
          const res = await fetch(url, {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
          });
          if (!res.ok) continue;

          const buffer = await res.arrayBuffer();
          const uint8 = new Uint8Array(buffer);
          const storageId = await ctx.storage.store(uint8);

          // Insert clip record
          const clipId = await ctx.db.insert("clips", {
            modelId: model._id as any,
            filename: file.name,
            storagePath: storageId,
            status: "downloaded",
            mimeType: file.mimeType || "video/mp4",
            fileSize: parseInt(file.size || "0", 10),
            createdAt: Date.now(),
            driveFileId: file.id,
          });

          // Trigger analysis (call analyzeClip mutation)
          // We do this by directly invoking the logic here to avoid circular calls
          await analyzeClipInline(ctx, clipId as any, model._id as any, (model as any).niche ?? "general");

          console.log(`Synced: ${file.name} → clip ${clipId}`);
        } catch (err) {
          console.error(`Failed to sync file ${file.name}:`, err);
        }
      }
    }
  },
});

// ─── Inline analysis — sends video directly to Gemini (no FFmpeg needed) ─────

async function analyzeClipInline(
  ctx: any,
  clipId: any,
  modelId: any,
  niche: string
): Promise<void> {
  const { GoogleGenerativeAI } = await import("@google/generative-ai");

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    console.warn("GEMINI_API_KEY not set — skipping analysis");
    return;
  }

  const clip = await ctx.db
    .query("clips")
    .filter((q: any) => q.eq(q.field("_id"), clipId))
    .first();

  if (!clip) return;

  const videoData = await ctx.storage.getRaw((clip as any).storagePath);
  if (!videoData) return;

  // Cap at 8MB for Gemini token limits
  const MAX_BYTES = 8 * 1024 * 1024;
  const videoBytes = videoData.byteLength > MAX_BYTES
    ? videoData.slice(0, MAX_BYTES)
    : videoData;

  const mimeType = (clip as any).mimeType ?? "video/mp4";
  const base64Video = Buffer.from(videoBytes).toString("base64");

  const genAI = new GoogleGenerativeAI(apiKey);
  const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const PROMPT = `You are analyzing raw video footage for Instagram Reel content creation.

Look at the video carefully and describe: scene, camera angle, lighting, people/actions, mood.

Return ONLY this JSON (no markdown, no explanation):
{
  "scene_description": "1-2 sentence overview",
  "hook_ideas": ["hook 1", "hook 2", "hook 3"],
  "on_screen_text_suggestions": [{"text": "text", "position": "top/bottom/center", "timing": "0-3s"}],
  "meme_ideas": [{"format": "format", "caption": "caption", "why_it_works": "why"}],
  "caption_suggestion": "caption under 150 chars",
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5", "#tag6", "#tag7", "#tag8"],
  "camera_direction_notes": "notes",
  "content_ideas": [{"title": "title", "hook": "hook", "steps": ["s1", "s2"]}]
}`;

  try {
    const result = await geminiModel.generateContent([
      { inlineData: { data: base64Video, mimeType: mimeType as any } },
      PROMPT,
    ]);
    const text = result.response.text().trim().replace(/^```json\s*/i, "").replace(/```\s*$/i, "");
    const analysis = JSON.parse(text);

    await ctx.db.insert("ideas", {
      modelId,
      niche,
      campaign: "Auto from Drive",
      promptInputs: JSON.stringify({ source: "google_drive_auto_sync", clipId }),
      generatedBrief: JSON.stringify(analysis),
      status: "ready",
      createdAt: Date.now(),
    });

    await ctx.db.patch(clipId, { status: "analyzed" });
    console.log(`Analyzed: ${(clip as any).filename}`);
  } catch (err) {
    console.error("Analysis failed for clip", clipId, err);
  }
}
