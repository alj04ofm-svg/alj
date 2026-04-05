"use client";
import { useState, useRef, useCallback } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export interface EnhancementOptions {
  stabilize: boolean;
  colorCorrect: boolean;
  denoise: boolean;
  sharpen: boolean;
  upscale: boolean;
}

export interface EnhancementResult {
  blob: Blob;
  url: string;
  sizeMb: number;
  durationSec: number;
}

export interface EnhancementProgress {
  step: "loading" | "transcoding" | "done" | "error";
  percent: number;
  stepLabel: string;
}

export function useVideoEnhancer() {
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const loadedRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<EnhancementProgress>({
    step: "loading",
    percent: 0,
    stepLabel: "Loading FFmpeg...",
  });

  // Load FFmpeg WASM — called once, cached
  const load = useCallback(async () => {
    if (loadedRef.current) return;
    setLoading(true);
    setProgress({ step: "loading", percent: 0, stepLabel: "Loading FFmpeg engine..." });

    try {
      const ffmpeg = new FFmpeg();
      ffmpegRef.current = ffmpeg;

      ffmpeg.on("progress", ({ progress: p }) => {
        setProgress({
          step: "transcoding",
          percent: Math.round(p * 100),
          stepLabel: "Enhancing video...",
        });
      });

      ffmpeg.on("log", ({ message }) => {
        if (message.includes("error")) console.error("[ffmpeg]", message);
      });

      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
      });

      loadedRef.current = true;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * enhance — apply FFmpeg enhancements to a video file.
   * Returns the enhanced blob and stats.
   */
  const enhance = useCallback(
    async (
      file: File,
      options: EnhancementOptions
    ): Promise<EnhancementResult> => {
      await load();

      const ffmpeg = ffmpegRef.current!;
      if (!ffmpeg) throw new Error("FFmpeg not loaded");

      // ── Write input file ────────────────────────────────────────────────
      setProgress({ step: "transcoding", percent: 5, stepLabel: "Loading video..." });
      await ffmpeg.writeFile("input.mp4", await fetchFile(file));

      // ── Build FFmpeg filter chain ──────────────────────────────────────
      const filters: string[] = [];

      if (options.stabilize) {
        // vidstabdetect + vidstabtransform for 2-pass stabilization
        // Pass 1: detect shakiness
        await ffmpeg.exec([
          "-i", "input.mp4",
          "-vf", "vidstabdetect=shakiness=5:accuracy=15:result=transforms.trf",
          "-f", "null", "-y",
        ]);
        filters.push("vidstabtransform=input=transforms.trf:smoothing=10");
      }

      if (options.colorCorrect) {
        // Warm Instagram-look: lift shadows, slightly saturated, lifted blacks
        filters.push("eq=brightness=0.05:saturation=1.25:contrast=1.08");
        // Cinematic grade: cool highlights, warm mids
        filters.push("colorbalance=rs=0.05:gs=-0.03:bs=0.08:rm=0.02:gm=-0.01:bm=-0.03");
      }

      if (options.denoise) {
        // HQ denoise — fast but effective
        filters.push("hqdn3d=4:3:6:4");
      }

      if (options.sharpen) {
        // Sharpen: enhance details without halo artifacts
        filters.push("unsharp=5:5:0.8:3:3:0.4");
      }

      if (options.upscale) {
        // Scale up 2x with super-resolution feel (fast bicubic upscale)
        filters.push("scale=iw*2:ih*2:flags=lanczos");
      }

      if (filters.length === 0) {
        // No filters — just re-encode cleanly
        filters.push("copy");
      }

      const filterString = filters.join(",");
      setProgress({ step: "transcoding", percent: 15, stepLabel: "Enhancing video..." });

      // ── Encode output ──────────────────────────────────────────────────
      await ffmpeg.exec([
        "-i", "input.mp4",
        "-vf", filterString,
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "23",
        "-c:a", "aac",
        "-b:a", "128k",
        "-movflags", "+faststart",
        "output.mp4",
        "-y",
      ]);

      setProgress({ step: "transcoding", percent: 95, stepLabel: "Finalizing..." });

      // ── Read output ────────────────────────────────────────────────────
      const data = await ffmpeg.readFile("output.mp4");
      // readFile returns Uint8Array | string — convert to Blob
      const uint8 = typeof data === "string"
        ? new TextEncoder().encode(data)
        : new Uint8Array(data);
      const blob = new Blob([uint8], { type: "video/mp4" });

      // Cleanup
      await ffmpeg.deleteFile("input.mp4").catch(() => {});
      await ffmpeg.deleteFile("output.mp4").catch(() => {});
      if (options.stabilize) {
        await ffmpeg.deleteFile("transforms.trf").catch(() => {});
      }

      setProgress({ step: "done", percent: 100, stepLabel: "Done!" });

      return {
        blob,
        url: URL.createObjectURL(blob),
        sizeMb: blob.size / (1024 * 1024),
        durationSec: 0, // duration not easily available without re-muxing
      };
    },
    [load]
  );

  return { enhance, loading, progress, isLoaded: loadedRef.current };
}
