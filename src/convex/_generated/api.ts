// Stub for `@/convex/_generated/api`
// Run `npx convex dev` in a separate terminal to generate the real file.
import { makeFunctionReference } from "convex/server";

// makeFunctionReference creates the right Convex function reference object type
export const api = {
  ideas: {
    generate: makeFunctionReference("ideas/generate"),
    list: makeFunctionReference("ideas/list"),
    create: makeFunctionReference("ideas/create"),
    updateStatus: makeFunctionReference("ideas/updateStatus"),
  },
  models: {
    list: makeFunctionReference("models/list"),
    ideas: makeFunctionReference("models/ideas/list"),
  },
  content: {
    enhance: makeFunctionReference("content/enhance"),
    upload: makeFunctionReference("content/upload"),
  },
  pipeline: {
    list: makeFunctionReference("pipeline/list"),
    sendToPipeline: makeFunctionReference("pipeline/sendToPipeline"),
    updateStatus: makeFunctionReference("pipeline/updateStatus"),
  },
};
