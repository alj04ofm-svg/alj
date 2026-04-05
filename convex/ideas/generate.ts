import { mutation, v } from "../_generated";

export const generate = mutation({
  args: {
    niche: v.string(),
    model: v.string(),
    style: v.string(),
    props: v.array(v.string()),
    outfits: v.array(v.string()),
    campaign: v.string(),
    count: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      throw new Error("GEMINI_API_KEY not configured. Add your key to .env.local");
    }

    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are a content brief writer for Instagram Reels for a content agency. A model will follow your brief to film a video.

Generate exactly ${args.count ?? 3} distinct, creative content brief(s) for this request:

**Model:** ${args.model}
**Niche:** ${args.niche}
**Style:** ${args.style}
**Props available:** ${args.props.join(", ") || "none"}
**Outfits available:** ${args.outfits.join(", ") || "none"}
**Campaign:** ${args.campaign}

For each brief, respond with valid JSON (no markdown, no code blocks) — an array of objects. Each object must have:
- "hook": one punchy, attention-grabbing sentence describing the opening (1-2 sentences max)
- "steps": array of 3-5 numbered filming instructions. Be dead simple — one action per step. The model runs this through a translator. Short sentences, no jargon.
- "camera": camera direction (eye level / close-up / medium / phone propped / etc.)
- "onScreenText": exact text to overlay on screen, or "(none)"
- "endShot": the final shot to end on
- "captionSuggestion": a short, punchy 1-2 line Instagram caption (no hashtags)
- "hashtags": array of 5-6 relevant hashtags including the model name and niche

IMPORTANT: Return ONLY a raw JSON array. No explanation, no preamble, no code fences.

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
    const cleaned = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();

    try {
      return JSON.parse(cleaned);
    } catch {
      return [{
        hook: args.model + " — " + args.niche + " content",
        steps: ["Film according to the brief", "Send clips back to editor"],
        camera: "eye level, close-up",
        onScreenText: "(none)",
        endShot: "Final confident pose",
        captionSuggestion: "POV: You know what it is 🖤",
        hashtags: [`#${args.model}`, `#${args.niche}`, "#Reels", "#Content"],
      }];
    }
  },
});
