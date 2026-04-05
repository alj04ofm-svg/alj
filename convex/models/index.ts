import { query, mutation } from "../_generated/server.js";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query("models").collect();
  },
});

export const connectDrive = mutation({
  args: {
    modelId: v.string(),
    tokens: v.object({
      access_token: v.string(),
      refresh_token: v.string(),
      expiry: v.number(),
    }),
    folderId: v.string(),
  },
  handler: async (ctx, args) => {
    const model = await ctx.db
      .query("models")
      .filter((q) => q.eq(q.field("_id"), args.modelId as any))
      .first();

    if (!model) {
      throw new Error(`Model not found: ${args.modelId}`);
    }

    await ctx.db.patch(args.modelId as any, {
      googleDriveTokens: JSON.stringify(args.tokens),
      driveFolderId: args.folderId,
    });

    return { success: true, modelId: args.modelId, folderId: args.folderId };
  },
});
