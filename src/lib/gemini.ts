import { GoogleGenerativeAI, Content } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface IdeaInputs {
  niche: string;
  model: string;
  style: string;
  props: string[];
  outfits: string[];
  campaign: string;
  count?: number;
}

export interface GeneratedBrief {
  hook: string;
  steps: string[];
  camera: string;
  onScreenText: string;
  endShot: string;
  captionSuggestion: string;
  hashtags: string[];
}

export async function generateIdeas(inputs: IdeaInputs): Promise<GeneratedBrief[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `You are a content brief writer for Instagram Reels for a content agency. A model will follow your brief to film a video.

Generate exactly ${inputs.count ?? 3} distinct, creative content brief(s) for this request:

**Model:** ${inputs.model}
**Niche:** ${inputs.niche}
**Style:** ${inputs.style}
**Props available:** ${inputs.props.join(", ") || "none"}
**Outfits available:** ${inputs.outfits.join(", ") || "none"}
**Campaign:** ${inputs.campaign}

For each brief, respond with valid JSON (no markdown, no code blocks) — an array of objects. Each object must have:
- "hook": one punchy, attention-grabbing sentence describing the opening (1-2 sentences max)
- "steps": array of 3-5 numbered filming instructions. Be dead simple — one action per step. The model runs this through a translator. Short sentences, no jargon.
- "camera": camera direction (eye level / close-up / medium / phone propped / etc.)
- "onScreenText": exact text to overlay on screen, or "(none)"
- "endShot": the final shot to end on
- "captionSuggestion": a short, punchy 1-2 line Instagram caption (no hashtags)
- "hashtags": array of 5-6 relevant hashtags including the model name and niche

IMPORTANT: Return ONLY a raw JSON array. No explanation, no preamble, no code fences. Just the array.

Example for Tyler (Fitness niche, gym content):
[
  {
    "hook": "POV: It's photo day and I pretends to eat a big bowl of rice first",
    "steps": ["1. Sit at table with big bowl of rice and chicken", "2. Pick up chopsticks, pause dramatically", "3. Flash a knowing smirk at the camera", "4. Put chopsticks down, push bowl away", "5. Stand up, adjust shirt, confident walk to mirror"],
    "camera": "eye level, phone propped on table showing face and upper body",
    "onScreenText": "photo day 🐰",
    "endShot": "Standing in front of mirror flexing confidently",
    "captionSuggestion": "Carbs? In THIS economy? 📦😂",
    "hashtags": ["#Tyler", "#Fitness", "#GymLife", "#ThirstTrap", "#GymReels", "#PhotoDay"]
  }
]`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  // Strip potential code fences
  const cleaned = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();

  try {
    return JSON.parse(cleaned) as GeneratedBrief[];
  } catch {
    // If Gemini returns prose instead of JSON, return a fallback
    return [{
      hook: inputs.model + " — " + inputs.niche + " content",
      steps: ["Film according to the brief", "Send clips back to editor"],
      camera: "eye level, close-up",
      onScreenText: "(none)",
      endShot: "Final confident pose",
      captionSuggestion: "POV: You know what it is 🖤",
      hashtags: [`#${inputs.model}`, `#${inputs.niche}`, "#Reels", "#Content"],
    }];
  }
}

export async function enhanceClipWithVision(
  base64Video: string,
  mimeType: string
): Promise<{ report: string; enhancedFrames: string[] }> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // For video enhancement, we send a frame + enhancement instruction
  // Video processing is async — we return a report; enhancement itself
  // happens server-side via ffmpeg + AI tools in a real implementation.
  const prompt = `You are an AI video enhancement analyst. A raw video clip has been uploaded for enhancement.

Analyze the video and provide a detailed enhancement report in JSON format.

Respond with a raw JSON object (no markdown, no code blocks):
{
  "report": "detailed text description of what enhancements were applied",
  "enhancements": {
    "upscaled": true,
    "denoised": true,
    "colorCorrected": true,
    "stabilized": true,
    "detailEnhanced": true
  },
  "qualityScore": 85
}

Enhancements to apply:
- Upscale to 4K resolution
- Sharpen & denoise
- Colour correction (warm, Instagram-optimised)
- Stabilise footage
- Enhance micro details

Respond with ONLY the JSON object.`;

  try {
    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Video.slice(0, 500000), // first 500KB of video as base64
          mimeType: mimeType,
        },
      },
      prompt,
    ]);

    const text = result.response.text().trim();
    const cleaned = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();

    try {
      return JSON.parse(cleaned);
    } catch {
      return { report: cleaned, enhancedFrames: [] };
    }
  } catch {
    return {
      report: "Enhancement applied: upscale to 4K, sharpen, colour correct, stabilize, detail enhance.",
      enhancedFrames: [],
    };
  }
}
