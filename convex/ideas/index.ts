import { query, mutation, v } from "../_generated/server";

export const list = query({
  args: {
    modelId: v.optional(v.string()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query("ideas").order("desc");
    if (args.modelId) q = q.filter((r) => r.eq(r.field("modelId"), args.modelId!));
    if (args.status) q = q.filter((r) => r.eq(r.field("status"), args.status!));
    return q.collect();
  },
});

export const create = mutation({
  args: {
    modelId: v.optional(v.string()),
    niche: v.string(),
    campaign: v.string(),
    promptInputs: v.string(),
    generatedBrief: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("ideas", {
      ...args,
      createdAt: Date.now(),
    });
    return id;
  },
});

export const updateStatus = mutation({
  args: { id: v.id("ideas"), status: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});
