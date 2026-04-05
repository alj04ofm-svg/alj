import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { existsSync } from "fs";

// POST /api/enhance
// Receives a video, applies FFmpeg enhancements, returns enhanced video path.
// FFmpeg must be installed on the server.
//
// Enhancements applied:
// - Stabilization (vidstab)
// - Color correction (eq + colorbalance)
// - Denoising (hqdn3d)
// - Sharpening (unsharp)

interface EnhanceRequest {
  enhanceOptions?: {
    stabilize?: boolean;
    colorCorrect?: boolean;
    denoise?: boolean;
    sharpen?: boolean;
    upscale?: boolean;
  };
}

async function runFfmpeg(args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn("ffmpeg", [...args, "-y"]);
    let stderr = "";

    proc.stderr.on("data", (data: Buffer) => {
      stderr += data.toString();
    });

    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited ${code}: ${stderr.slice(-500)}`));
    });

    proc.on("error", (err) => reject(err));
  });
}

export async function POST(req: NextRequest) {
  // Check FFmpeg is available
  if (!existsSync("/usr/local/bin/ffmpeg") && !existsSync("/usr/bin/ffmpeg")) {
    return NextResponse.json(
      { error: "FFmpeg is not installed on the server. Video enhancement requires FFmpeg." },
      { status: 503 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("video") as File | null;
    const options: EnhanceRequest["enhanceOptions"] = JSON.parse(
      (formData.get("options") as string) ?? "{}"
    );

    if (!file) {
      return NextResponse.json({ error: "No video file provided" }, { status: 400 });
    }

    // 50MB max
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 50MB)" }, { status: 400 });
    }

    const opts = {
      stabilize: options?.stabilize ?? true,
      colorCorrect: options?.colorCorrect ?? true,
      denoise: options?.denoise ?? true,
      sharpen: options?.sharpen ?? true,
      upscale: options?.upscale ?? false,
    };

    const tmpDir = tmpdir();
    const inputPath = join(tmpDir, `enhance_in_${Date.now()}.mp4`);
    const outputPath = join(tmpDir, `enhance_out_${Date.now()}.mp4`);

    // Write input file
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(inputPath, buffer);

    try {
      // Build filter chain
      const filters: string[] = [];

      if (opts.stabilize) {
        // Two-pass stabilization
        await runFfmpeg([
          "-i", inputPath,
          "-vf", "vidstabdetect=shakiness=5:accuracy=15:result=transforms.trf",
          "-f", "null", inputPath + ".null",
        ]);
        filters.push("vidstabtransform=input=transforms.trf:smoothing=10");
      }

      if (opts.colorCorrect) {
        // Lift shadows, saturate, add contrast
        filters.push("eq=brightness=0.05:saturation=1.3:contrast=1.1");
        // Subtle cinematic warmth
        filters.push("colorbalance=rs=0.05:gs=-0.02:bs=0.07");
      }

      if (opts.denoise) {
        filters.push("hqdn3d=4:3:6:4");
      }

      if (opts.sharpen) {
        filters.push("unsharp=5:5:0.8:3:3:0.4");
      }

      if (opts.upscale) {
        filters.push("scale=iw*2:ih*2:flags=lanczos");
      }

      const args = ["-i", inputPath];

      if (filters.length > 0) {
        args.push("-vf", filters.join(","));
      }

      args.push(
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "22",
        "-c:a", "aac",
        "-b:a", "128k",
        "-movflags", "+faststart",
        outputPath
      );

      await runFfmpeg(args);

      // Read enhanced file
      const { readFile } = await import("fs/promises");
      const enhancedBuffer = await readFile(outputPath);

      // Return as streaming response
      return new NextResponse(enhancedBuffer, {
        headers: {
          "Content-Type": "video/mp4",
          "Content-Disposition": `attachment; filename="enhanced_${file.name}"`,
          "Content-Length": String(enhancedBuffer.length),
          "X-Enhanced": "true",
          "X-Enhancement-Filters": filters.length.toString(),
        },
      });
    } finally {
      // Cleanup temp files
      await unlink(inputPath).catch(() => {});
      await unlink(outputPath).catch(() => {});
      await unlink(inputPath + ".null").catch(() => {});
    }
  } catch (err) {
    console.error("[/api/enhance]", err);
    return NextResponse.json(
      { error: `Enhancement failed: ${err instanceof Error ? err.message : "unknown error"}` },
      { status: 500 }
    );
  }
}
