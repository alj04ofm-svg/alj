import { query, mutation } from "../_generated/server.js";
import { v } from "convex/values";

export const list = query({
  args: { status: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let q = ctx.db.query("pipeline").order("desc");
    if (args.status) q = q.filter((r) => r.eq(r.field("status"), args.status!));
    return q.collect();
  },
});

export const sendToPipeline = mutation({
  args: { clipId: v.optional(v.string()), ideaId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("pipeline", {
      clipId: args.clipId,
      ideaId: args.ideaId,
      status: "pending",
      sentToEditingAt: Date.now(),
      createdAt: Date.now(),
    });
    return id;
  },
});

export const updateStatus = mutation({
  args: { id: v.id("pipeline"), status: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});
