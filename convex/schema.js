import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  models: defineTable({
    name: v.string(),
    niche: v.string(),
    instagramHandle: v.string(),
    avatarUrl: v.optional(v.string()),
    status: v.string(),
    googleDriveTokens: v.optional(v.string()),
    driveFolderId: v.optional(v.string()),
  }).index("by_name", ["name"]),

  ideas: defineTable({
    modelId: v.optional(v.string()),
    niche: v.string(),
    campaign: v.string(),
    promptInputs: v.string(),
    generatedBrief: v.string(),
    status: v.string(),
    createdBy: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_model", ["modelId"])
    .index("by_status", ["status"])
    .index("by_created", ["createdAt"]),

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
    driveFileId: v.optional(v.string()),
  })
    .index("by_idea", ["ideaId"])
    .index("by_status", ["status"]),

  pipeline: defineTable({
    clipId: v.optional(v.string()),
    ideaId: v.optional(v.string()),
    status: v.string(),
    sentToEditingAt: v.optional(v.number()),
    editedAt: v.optional(v.number()),
    approvedAt: v.optional(v.number()),
    postedAt: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_status", ["status"]),
});
