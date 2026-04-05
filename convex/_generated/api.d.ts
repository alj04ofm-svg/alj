/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as content_index from "../content/index.js";
import type * as dataModel from "../dataModel.js";
import type * as drive_analyze from "../drive/analyze.js";
import type * as drive_index from "../drive/index.js";
import type * as ideas_generate from "../ideas/generate.js";
import type * as ideas_index from "../ideas/index.js";
import type * as models_ideas from "../models/ideas.js";
import type * as models_index from "../models/index.js";
import type * as pipeline_index from "../pipeline/index.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "content/index": typeof content_index;
  dataModel: typeof dataModel;
  "drive/analyze": typeof drive_analyze;
  "drive/index": typeof drive_index;
  "ideas/generate": typeof ideas_generate;
  "ideas/index": typeof ideas_index;
  "models/ideas": typeof models_ideas;
  "models/index": typeof models_index;
  "pipeline/index": typeof pipeline_index;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
