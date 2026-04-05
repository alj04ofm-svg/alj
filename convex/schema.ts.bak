import { defineSchema } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  models: defineTable({
    name: v.string(),
    niche: v.string(),
    instagramHandle: v.string(),
    avatarUrl: v.optional(v.string()),
    status: v.string(),
    googleDriveTokens: v.optional(v.string()), // JSON: { access_token, refresh_token, expiry }
    driveFolderId: v.optional(v.string()),
  }).index("by_name", (r) => r.name),

  ideas: defineTable({
    modelId: v.optional(v.string()),
    niche: v.string(),
    campaign: v.string(),
    promptInputs: v.string(), // JSON stringified
    generatedBrief: v.string(), // JSON stringified
    status: v.string(),
    createdBy: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_model", (r) => r.modelId)
    .index("by_status", (r) => r.status)
    .index("by_created", (r) => r.createdAt),

  clips: defineTable({
    ideaId: v.optional(v.string()),
    modelId: v.optional(v.string()),
    filename: v.string(),
    storagePath: v.string(),
    status: v.string(),
    enhancedPath: v.optional(v.string()),
    mimeType: v.string(),
    fileSize: v.optional(v.number()),
    createdAt: v.number(),
    driveFileId: v.optional(v.string()), // Google Drive file ID if synced from Drive
  })
    .index("by_idea", (r) => r.ideaId)
    .index("by_status", (r) => r.status),

  pipeline: defineTable({
    clipId: v.optional(v.string()),
    ideaId: v.optional(v.string()),
    status: v.string(),
    sentToEditingAt: v.optional(v.number()),
    editedAt: v.optional(v.number()),
    approvedAt: v.optional(v.number()),
    postedAt: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_status", (r) => r.status),
});
