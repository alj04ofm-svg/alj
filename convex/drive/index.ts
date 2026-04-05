import { mutation, query } from "convex/server";
import { v } from "convex/values";

// ─── Token helpers ────────────────────────────────────────────────────────────

interface GoogleTokens {
  access_token: string;
  refresh_token?: string;
  expiry: number; // Unix ms
}

async function getValidTokens(
  storedTokensJson: string | null
): Promise<{ tokens: GoogleTokens; refreshed: boolean } | null> {
  if (!storedTokensJson) return null;

  const tokens: GoogleTokens = JSON.parse(storedTokensJson);

  // If token is still valid (with 60s buffer), use it as-is
  if (tokens.expiry > Date.now() + 60_000) {
    return { tokens, refreshed: false };
  }

  // Expired — try to refresh
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
  const refreshedTokens: GoogleTokens = {
    access_token: data.access_token,
    refresh_token: tokens.refresh_token, // unchanged
    expiry: Date.now() + data.expires_in * 1000,
  };

  return { tokens: refreshedTokens, refreshed: true };
}

// ─── Drive API calls ───────────────────────────────────────────────────────────

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size: string;
  modifiedTime: string;
  thumbnailLink?: string;
  webContentLink?: string;
}

async function listDriveFiles(
  accessToken: string,
  folderId: string
): Promise<DriveFile[]> {
  const q = encodeURIComponent(`'${folderId}' in parents and mimeType contains 'video'`);
  const url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,mimeType,size,modifiedTime,thumbnailLink,webContentLink)&orderBy=modifiedTime desc`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Drive API list error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.files ?? [];
}

// ─── Convex mutations ─────────────────────────────────────────────────────────

/**
 * listFolderFiles — lists video files in a model's Drive folder.
 * Returns new files (not yet in clips table).
 */
export const listFolderFiles = mutation({
  args: { modelId: v.string() },
  handler: async (ctx, args) => {
    const model = await ctx.db
      .query("models")
      .filter((q) => q.eq(q.field("_id"), args.modelId as any))
      .first();

    if (!model) throw new Error(`Model not found: ${args.modelId}`);
    if (!model.driveFolderId) throw new Error(`No driveFolderId set for model ${args.modelId}`);

    const tokenResult = await getValidTokens(model.googleDriveTokens ?? null);
    if (!tokenResult) throw new Error(`No valid Drive tokens for model ${args.modelId}`);

    const { tokens: refreshedTokens } = tokenResult;

    // Refresh tokens in DB if changed
    if (tokenResult.refreshed) {
      await ctx.db.patch(args.modelId as any, {
        googleDriveTokens: JSON.stringify(refreshedTokens),
      });
    }

    const driveFiles = await listDriveFiles(refreshedTokens.access_token, model.driveFolderId);

    // Find which files are already tracked in clips table
    const existingClips = await ctx.db
      .query("clips")
      .filter((q) => q.eq(q.field("modelId"), args.modelId))
      .collect();

    const existingDriveIds = new Set(
      existingClips
        .map((c) => (c as any).driveFileId)
        .filter(Boolean)
    );

    const newFiles = driveFiles.filter((f) => !existingDriveIds.has(f.id));

    return { allFiles: driveFiles, newFiles, totalCount: driveFiles.length };
  },
});

/**
 * downloadFile — downloads a video from Drive and stores it in Convex storage.
 */
export const downloadFile = mutation({
  args: {
    modelId: v.string(),
    driveFileId: v.string(),
    filename: v.string(),
  },
  handler: async (ctx, args) => {
    const model = await ctx.db
      .query("models")
      .filter((q) => q.eq(q.field("_id"), args.modelId as any))
      .first();

    if (!model) throw new Error(`Model not found: ${args.modelId}`);

    const tokenResult = await getValidTokens(model.googleDriveTokens ?? null);
    if (!tokenResult) throw new Error(`No valid Drive tokens for model ${args.modelId}`);

    // Download the file
    const url = `https://www.googleapis.com/drive/v3/files/${args.driveFileId}?alt=media`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${tokenResult.tokens.access_token}` },
    });

    if (!res.ok) {
      throw new Error(`Drive download error ${res.status}`);
    }

    const buffer = await res.arrayBuffer();
    const uint8 = new Uint8Array(buffer);

    // Store in Convex storage
    const storageId = await ctx.storage.store(uint8);

    // Insert clips record
    const clipId = await ctx.db.insert("clips", {
      modelId: args.modelId,
      filename: args.filename,
      storagePath: storageId,
      status: "downloaded",
      mimeType: "video/mp4", // Drive will report real type but we default
      fileSize: buffer.byteLength,
      createdAt: Date.now(),
      driveFileId: args.driveFileId,
    });

    return { clipId, storageId, fileSize: buffer.byteLength };
  },
});

/**
 * saveFolderId — saves the Drive folder ID for a model (called after OAuth).
 */
export const saveFolderId = mutation({
  args: {
    modelId: v.string(),
    folderId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.modelId as any, {
      driveFolderId: args.folderId,
    });
    return { success: true };
  },
});

/**
 * getDriveStatus — query: returns Drive connection status for all models.
 */
export const getDriveStatus = query({
  args: {},
  handler: async (ctx) => {
    const models = await ctx.db.query("models").collect();
    return models.map((m) => ({
      _id: m._id,
      name: m.name,
      instagramHandle: m.instagramHandle,
      driveFolderId: (m as any).driveFolderId ?? null,
      isConnected: !!(m as any).googleDriveTokens,
    }));
  },
});
