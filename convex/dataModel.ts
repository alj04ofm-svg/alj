// Convex data model — used by _generated.d.ts stub
// Run `npx convex dev` to auto-generate the real type-safe version.
import type { DataModelFromSchemaDefinition } from "convex/server";
import schema from "./schema.js";

export type DataModel = DataModelFromSchemaDefinition<typeof schema>;
