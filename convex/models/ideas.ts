import { query, v } from "convex/server";

export const list = query({
  args: { modelId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let q = ctx.db.query("ideas").order("desc");
    if (args.modelId) q = q.filter((r) => r.eq(r.field("modelId"), args.modelId!));
    return q.collect();
  },
});
