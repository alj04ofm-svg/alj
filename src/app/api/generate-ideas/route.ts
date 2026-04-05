import { NextRequest, NextResponse } from "next/server";

// Gemini API key — add GEMINI_API_KEY to .env.local
// Get a key at: https://aistudio.google.com/app/apikey
const GEMINI_MODEL = "gemini-2.0-flash";

interface GenerateRequest {
  model: string;
  niche: string;
  style: string;
  campaign: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: GenerateRequest = await req.json();
    const { model, niche, style, campaign } = body;

    if (!model || !niche || !style) {
      return NextResponse.json(
        { error: "model, niche, and style are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY not configured. Add it to .env.local" },
        { status: 500 }
      );
    }

    const prompt = `You are a content brief writer for Instagram Reels. Generate exactly 3 distinct, creative content briefs:

Model: ${model}
Niche: ${niche}
Style: ${style}
Campaign: ${campaign || "Untitled Campaign"}

Return ONLY a valid JSON array of 3 objects — no markdown, no code fences, no explanation. Each object:
{
  "hook": "one punchy attention-grabbing sentence (under 12 words)",
  "steps": ["numbered filming instruction 1", "step 2", "step 3", "step 4"],
  "camera": "camera setup in one sentence",
  "onScreenText": "text overlay, max 6 words, or \"(none)\"",
  "endShot": "what to show in the final 2 seconds",
  "captionSuggestion": "punchy 1-2 line Instagram caption",
  "hashtags": ["#Tag1", "#Tag2", "#Tag3", "#Tag4", "#Tag5", "#Tag6"]
}

Rules:
- Steps must be simple enough that any model could follow them without asking questions
- Include ring light ON/OFF in steps where relevant
- Hashtags MUST include the model name and niche
- End Shot must leave the viewer wanting more
- Return ONLY the JSON array`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.9,
            maxOutputTokens: 4096,
          },
        }),
      }
    );

    if (!geminiRes.ok) {
      const err = await geminiRes.text();
      return NextResponse.json(
        { error: `Gemini API error: ${geminiRes.status} — ${err}` },
        { status: geminiRes.status }
      );
    }

    const data = await geminiRes.json();
    const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    if (!generatedText) {
      return NextResponse.json({ error: "Gemini returned empty response" }, { status: 500 });
    }

    // Parse JSON directly — much more reliable than regex parsing
    let briefs: any[];
    try {
      briefs = JSON.parse(generatedText);
      if (!Array.isArray(briefs)) briefs = [briefs];
    } catch {
      return NextResponse.json(
        { error: "Failed to parse Gemini response as JSON", raw: generatedText },
        { status: 500 }
      );
    }

    // Normalize each brief to always have captionSuggestion → caption
    const normalized = briefs.map((b, i) => ({
      hook: b.hook ?? "",
      steps: Array.isArray(b.steps) ? b.steps : [],
      camera: b.camera ?? "eye level, phone selfie, natural lighting",
      onScreenText: b.onScreenText ?? "(none)",
      endShot: b.endShot ?? "Confident look at camera",
      captionSuggestion: b.captionSuggestion ?? b.caption ?? b.hook ?? "",
      caption: b.caption ?? b.captionSuggestion ?? b.hook ?? "",
      hashtags: Array.isArray(b.hashtags) ? b.hashtags.slice(0, 8) : [`#${model}`, `#${niche}`, "#Reels", "#Content"],
    }));

    return NextResponse.json({
      briefs: normalized,
      model,
      niche,
      style,
      campaign,
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[/api/generate-ideas]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}