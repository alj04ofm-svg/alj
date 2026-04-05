import { query, v } from "../_generated";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query("models").collect();
  },
});
