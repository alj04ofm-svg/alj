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

function buildPrompt(req: GenerateRequest): string {
  return `You are a content strategist for Instagram Reels. Generate 3 highly detailed content briefs for a model with the following profile:

Model: ${req.model}
Niche: ${req.niche}
Style: ${req.style}
Campaign: ${req.campaign || "Untitled Campaign"}

For EACH of the 3 briefs, return EXACTLY this structure:

## BRIEF [number]
HOOK: [One compelling hook line — short, punchy, makes someone stop scrolling]
STEPS: [4-6 specific filming steps, numbered, clear and actionable. Include camera setup, what to show on screen, what to say or do at camera, and how long each part should be]
CAMERA: [Camera angle, height, framing, and lighting setup in one sentence]
ON_SCREEN_TEXT: [Short text overlay that appears during the reel, max 6 words]
END_SHOT: [What to show in the final 2 seconds — the hook, the brand, the vibe]
CAPTION: [Suggested caption, max 150 chars, punchy and engagement-driving]
HASHTAGS: [exactly 6 hashtags, format: #Tag1 #Tag2 #Tag3 #Tag4 #Tag5 #Tag6]

Rules:
- Steps must be specific enough that any model could film them without additional questions
- Include ring light ON/OFF instructions in steps
- HOOK must be under 12 words
- HASHTAGS must include the model name and niche
- End Shot must leave the viewer wanting more
- CAMERA and ON_SCREEN_TEXT must be usable without editing knowledge
- CAPTION must feel natural, not over-optimized

Respond ONLY with the 3 briefs in this exact format. No preamble, no explanation.`;
}

interface ParsedBrief {
  hook: string;
  steps: string[];
  camera: string;
  onScreenText: string;
  endShot: string;
  caption: string;
  hashtags: string[];
}

function parseGeminiResponse(text: string, req: GenerateRequest): ParsedBrief[] {
  const briefs: ParsedBrief[] = [];
  const sections = text.split("## BRIEF");

  for (const section of sections) {
    if (!section.trim()) continue;

    const get = (key: string): string => {
      const match = section.match(new RegExp(`${key}:\\s*([\\s\\S]*?)(?=\\n[A-Z_]+:|\\n\\n|$)`, "i"));
      return match ? match[1].trim() : "";
    };

    const hook = get("HOOK");
    const camera = get("CAMERA");
    const onScreenText = get("ON_SCREEN_TEXT");
    const endShot = get("END_SHOT");
    const caption = get("CAPTION");

    const stepsMatch = section.match(/STEPS:([\s\S]*?)(?=CAMERA:|$)/i);
    const stepsRaw = stepsMatch ? stepsMatch[1] : "";
    const steps = stepsRaw
      .split(/\n\d+[\.\)]\s*/)
      .map(s => s.trim())
      .filter(s => s.length > 10);

    const hashtagsMatch = section.match(/HASHTAGS:\s*([^\n]+)/i);
    const hashtagsRaw = hashtagsMatch ? hashtagsMatch[1] : "";
    const hashtags = hashtagsRaw
      .split(/\s+/)
      .filter(t => t.startsWith("#"))
      .slice(0, 8);

    if (hook && steps.length > 0) {
      briefs.push({
        hook,
        steps,
        camera: camera || "eye level, phone selfie, natural lighting",
        onScreenText: onScreenText || hook.split(" ").slice(0, 4).join(" "),
        endShot: endShot || "Confident look at camera",
        caption: caption || hook,
        hashtags: hashtags.length > 0 ? hashtags : [`#${req.model}`, `#${req.niche}`, "#Reels", "#Content"],
      });
    }
  }

  return briefs;
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

    const prompt = buildPrompt({ model, niche, style, campaign });

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
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

    const briefs = parseGeminiResponse(generatedText, body);

    return NextResponse.json({
      briefs,
      raw: generatedText,
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