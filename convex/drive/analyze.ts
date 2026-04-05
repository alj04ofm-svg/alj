import { mutation } from "../_generated";
import { v } from "convex/values";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface VideoAnalysisResult {
  scene_description: string;
  hook_ideas: string[];
  on_screen_text_suggestions: { text: string; position: string; timing: string }[];
  meme_ideas: { format: string; caption: string; why_it_works: string }[];
  caption_suggestion: string;
  hashtags: string[];
  camera_direction_notes: string;
  content_ideas: { title: string; hook: string; steps: string[] }[];
}

const ANALYSIS_PROMPT = `You are analyzing raw video footage for Instagram Reel content creation.

Look carefully at the video and describe:
- What's happening in the scene (actions, expressions, movements)
- Camera angle, framing, and movement
- Lighting quality and mood
- People, objects, props visible
- Any text or graphics on screen
- Overall vibe and energy

Then generate content recommendations in EXACTLY this JSON format (pure JSON, no markdown, no explanation):

{
  "scene_description": "1-2 sentence overview of the entire video",
  "hook_ideas": [
    "punchy hook under 8 words — makes someone stop scrolling",
    "second hook option",
    "third hook option"
  ],
  "on_screen_text_suggestions": [
    { "text": "bold text overlay", "position": "top/bottom/center", "timing": "0-2s" },
    { "text": "second text", "position": "top/bottom/center", "timing": "3-6s" }
  ],
  "meme_ideas": [
    { "format": "meme format name", "caption": "caption or text overlay", "why_it_works": "one sentence on why this works" }
  ],
  "caption_suggestion": "engaging caption under 150 chars, drives comments",
  "hashtags": ["#niche1", "#niche2", "#niche3", "#niche4", "#niche5", "#niche6", "#niche7", "#niche8"],
  "camera_direction_notes": "1-2 sentences: what to change if reshooting this footage",
  "content_ideas": [
    { "title": "Concept title", "hook": "opening hook for this concept", "steps": ["step 1", "step 2", "step 3"] }
  ]
}

Rules:
- hashtags MUST be specific to the model's niche (fitness, GFE, lifestyle, etc.)
- hook_ideas must be punchy and stop-scroll quality, under 8 words each
- caption_suggestion must be under 150 characters
- content_ideas should be Reels under 60 seconds using this footage
- Return ONLY the JSON object
`;

/**
 * analyzeClip — sends a video directly to Gemini for analysis.
 * No FFmpeg needed — uses Gemini's native video understanding.
 *
 * Flow:
 * 1. Read video from Convex storage
 * 2. Send first 8MB to Gemini (covers most clips, stays within token limits)
 * 3. Parse JSON response
 * 4. Save analysis to ideas table
 */
export const analyzeClip = mutation({
  args: {
    clipId: v.string(),
    modelId: v.string(),
    niche: v.optional(v.string()),
    campaign: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      throw new Error("GEMINI_API_KEY not configured in .env.local");
    }

    // ── 1. Read video from Convex storage ─────────────────────────────────
    const clip = await ctx.db
      .query("clips")
      .filter((q) => q.eq(q.field("_id"), args.clipId as any))
      .first();

    if (!clip) throw new Error(`Clip not found: ${args.clipId}`);

    const videoData = await ctx.storage.getRaw((clip as any).storagePath as any);
    if (!videoData) throw new Error(`Storage file not found for clip: ${args.clipId}`);

    // ── 2. Prepare video data ───────────────────────────────────────────────
    // Cap at 8MB to stay within Gemini token limits (video is expensive)
    const MAX_BYTES = 8 * 1024 * 1024;
    const videoBytes = videoData.byteLength > MAX_BYTES
      ? videoData.slice(0, MAX_BYTES)
      : videoData;

    const mimeType = (clip as any).mimeType ?? "video/mp4";
    const base64Video = Buffer.from(videoBytes).toString("base64");

    // ── 3. Call Gemini with video ─────────────────────────────────────────
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    let analysis: VideoAnalysisResult;
    try {
      const result = await model.generateContent([
        {
          inlineData: {
            data: base64Video,
            mimeType: mimeType as any,
          },
        },
        ANALYSIS_PROMPT,
      ]);

      const text = result.response.text().trim().replace(/^```json\s*/i, "").replace(/```\s*$/i, "");
      analysis = JSON.parse(text);
    } catch (err) {
      // Fallback: try with a reduced prompt if full video fails
      console.error("Gemini analysis failed:", err);
      throw new Error(
        `Gemini analysis failed: ${err instanceof Error ? err.message : "unknown error"}. ` +
        "Video may be too large or in an unsupported format. Try a shorter clip."
      );
    }

    // ── 4. Save to ideas table ─────────────────────────────────────────────
    const ideaId = await ctx.db.insert("ideas", {
      modelId: args.modelId,
      niche: args.niche ?? "general",
      campaign: args.campaign ?? "Auto from Drive",
      promptInputs: JSON.stringify({
        source: "google_drive",
        clipId: args.clipId,
        filename: (clip as any).filename,
        videoSize: videoData.byteLength,
      }),
      generatedBrief: JSON.stringify(analysis),
      status: "ready",
      createdAt: Date.now(),
    });

    // ── 5. Update clip status ─────────────────────────────────────────────
    await ctx.db.patch(args.clipId as any, { status: "analyzed" });

    return {
      ideaId,
      filename: (clip as any).filename,
      sceneDescription: analysis.scene_description,
      hooks: analysis.hook_ideas,
    };
  },
});

/**
 * analyzeClipFromUrl — alternative entry point.
 * Accepts a Drive download URL and analyzes without needing Convex storage.
 * Useful when called from an API route or when the video is streamed directly.
 */
export const analyzeClipFromUrl = mutation({
  args: {
    driveUrl: v.string(),
    filename: v.string(),
    modelId: v.string(),
    mimeType: v.optional(v.string()),
    niche: v.optional(v.string()),
    campaign: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      throw new Error("GEMINI_API_KEY not configured");
    }

    // Download video from Drive URL
    const res = await fetch(args.driveUrl);
    if (!res.ok) throw new Error(`Failed to fetch video: ${res.status}`);

    const buffer = await res.arrayBuffer();
    const MAX_BYTES = 8 * 1024 * 1024;
    const videoBytes = buffer.byteLength > MAX_BYTES
      ? (await import("buffer")).Buffer.from(buffer).slice(0, MAX_BYTES)
      : (await import("buffer")).Buffer.from(buffer);

    const mimeType = args.mimeType ?? "video/mp4";
    const base64Video = videoBytes.toString("base64");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    let analysis: VideoAnalysisResult;
    try {
      const result = await model.generateContent([
        { inlineData: { data: base64Video, mimeType: mimeType as any } },
        ANALYSIS_PROMPT,
      ]);
      const text = result.response.text().trim().replace(/^```json\s*/i, "").replace(/```\s*$/i, "");
      analysis = JSON.parse(text);
    } catch (err) {
      console.error("Gemini analysis failed:", err);
      throw new Error(`Gemini failed: ${err instanceof Error ? err.message : "unknown error"}`);
    }

    const ideaId = await ctx.db.insert("ideas", {
      modelId: args.modelId,
      niche: args.niche ?? "general",
      campaign: args.campaign ?? "Auto from Drive",
      promptInputs: JSON.stringify({
        source: "google_drive_direct",
        filename: args.filename,
        videoSize: buffer.byteLength,
      }),
      generatedBrief: JSON.stringify(analysis),
      status: "ready",
      createdAt: Date.now(),
    });

    return {
      ideaId,
      filename: args.filename,
      sceneDescription: analysis.scene_description,
      hooks: analysis.hook_ideas,
    };
  },
});
