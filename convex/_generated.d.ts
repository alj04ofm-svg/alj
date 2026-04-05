// This file is a manual stub for local development.
// Run `npx convex dev` in a separate terminal to get the real generated file.
//
// Convex generates this automatically — this stub prevents TS errors before
// `npx convex dev` has been started.

import { GenericMutationCtx, GenericQueryCtx, queryGeneric, mutationGeneric } from "convex/server";
import { DataModel } from "./dataModel.js";

export const query = queryGeneric;
export const mutation = mutationGeneric;

export type QueryCtx = GenericQueryCtx<DataModel>;
export type MutationCtx = GenericMutationCtx<DataModel>;
