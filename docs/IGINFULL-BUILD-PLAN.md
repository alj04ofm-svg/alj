# IGINFULL Build Plan — Session Plan
**Date:** 2026-04-06  
**Status:** In Progress  
**Deadline:** ~4 hours

---

## Overview
The IGINFULL website is a content agency management platform. The full pipeline is:
**Ideas → Content (film/shoot) → Models (filming pipeline) → Approvals (client review) → Schedule (publish)**

---

## Current State Summary

### Pages & What Works / What's Broken

| Page | Status | Key Issues |
|---|---|---|
| `/` (Home) | ✅ Static marketing page | OK |
| `/login` | ⚠️ Partial | Google OAuth stubbed out |
| `/schedule` | ⚠️ Partial | Month nav + "Schedule Post" have no handlers. Duplicate AnalyticsView fn |
| `/content` | ⚠️ Partial | Drive sync is UI-only. No real Convex storage. |
| `/ideas` | ⚠️ Partial | Convex action `as any` cast — not fully wired. Gemini working. |
| `/models` | ⚠️ Partial | "Send to Editing", "Resend Reminder" buttons broken. All via localStorage. |
| `/analytics` | ⚠️ Partial | All data hardcoded. Export Report non-functional. |
| `/approvals` | ⚠️ Partial | Revision comment never saved. "reject" → "revision" bug. |
| `/community` | ⚠️ Partial | Brand "Typeless" wrong. Like/Save/Follow all non-functional. |
| `/team` | ⚠️ Partial | Invite/Edit/Message all stubs. |
| `/settings` | ⚠️ Partial | All toggles/dropdowns/saves non-functional. Drive OAuth works. |

### Cross-Page Flows (all via localStorage — needs real Convex)
- `/content` → `/models`: `localStorage iginfull-pipeline`
- `/approvals` → `/schedule`: `localStorage iginfull-schedule`
- `/ideas`: in-memory only

---

## Priority 1 — Fix Ideas + Convex Wire (CRITICAL)

### Problem
The Ideas page is supposed to call Convex → Gemini. Currently:
1. `useAction(api.ideas.generate as any)` — `as any` means TypeScript can't verify the type
2. Convex action IS registered (`ideas/generate.js:generate`) ✓
3. `GEMINI_API_KEY` IS set in Convex env via `npx convex env set` ✓
4. The fallback chain: Convex action → `/api/generate-ideas` → mock
5. Rate limit 429 — free tier Gemini key throttled

### Fix Needed
1. The `as any` cast on `useAction` is fine for now but should be cleaned up
2. Ideas briefs should save to Convex `ideas` table (not in-memory)
3. "Send to [Model]'s Dashboard" should actually call Convex and write to the pipeline
4. Add "Next Section →" button after sending: go to `/content` with context

### Files to touch
- `src/app/ideas/page.tsx` — wire `sendToModel` to call Convex
- `convex/ideas/generate.ts` — already working
- `convex/ideas/index.ts` — wire `create` mutation

---

## Priority 2 — Content Page → Real Convex Storage

### Problem
Content page saves clips to localStorage as base64. Should save to Convex `clips` table.

### Fix Needed
1. Upload clips to Convex storage (`ctx.storage.store`) instead of localStorage
2. Wire "Send to Editing Pipeline" to `pipeline.sendToPipeline` mutation
3. Update clip status in Convex as it flows through enhance steps

### Files to touch
- `src/app/content/page.tsx` — replace localStorage with Convex calls
- `convex/content/index.ts` — `upload` mutation (already has storage path arg)

---

## Priority 3 — Models Page → Real Convex Data

### Problem
Models page reads from `localStorage iginfull-pipeline`. Should read from Convex `pipeline` + `clips` tables.

### Fix Needed
1. Replace localStorage polling with `useQuery(api.pipeline.list)`
2. Wire "Send to Editing" to `pipeline.sendToPipeline`
3. Wire "Resend Reminder" to a future notification mutation (stub for now)

### Files to touch
- `src/app/models/page.tsx`

---

## Priority 4 — Approvals Fixes

### Problem
1. `handleAction`: both `revision` and `reject` set status to `"revision"` — no distinct rejection
2. Revision comment never saved
3. "Approve" writes to localStorage for schedule — should also call Convex

### Fix Needed
1. Fix `handleAction` to have a real "rejected" state
2. Add rejection reason/comment to `handleAction`
3. Wire approvals to write to Convex `pipeline` table

### Files to touch
- `src/app/approvals/page.tsx`

---

## Priority 5 — Schedule Page Fixes

### Problem
1. Prev/Next month navigation has no handlers
2. "Schedule Post" button has no handler
3. `AnalyticsView` function declared twice (copy-paste bug)

### Fix Needed
1. Add `currentMonth` state with prev/next handlers
2. Add "Schedule Post" modal or redirect to `/content`
3. Remove duplicate AnalyticsView

### Files to touch
- `src/app/schedule/page.tsx`

---

## Priority 6 — Team Page → Functional

### Problem
Invite modal + Edit/Message buttons all non-functional stubs.

### Fix Needed
1. `handleInvite` should call a real Convex mutation (or at minimum POST to `/api/team/invite`)
2. Add team invitation API route
3. Add Convex `team.invite` mutation

### Files to touch
- `src/app/team/page.tsx`
- `src/app/api/team/invite/route.ts` (new)
- `convex/team/index.ts` (new)

---

## Priority 7 — Settings → Functional

### Problem
All toggles, dropdowns, Drive connect, billing buttons non-functional.

### Fix Needed
1. Profile saves to Convex `models` table or user profile
2. Drive OAuth already works (reads query params)
3. Billing buttons → add Convex billing mutation stubs
4. "Connect New Account" → Google OAuth flow

### Files to touch
- `src/app/settings/page.tsx`
- `convex/settings/index.ts` (new)

---

## Priority 8 — Community → Brand Fix + Interactions

### Problem
1. Top bar says "Typeless" instead of "IGINFULL"
2. Like, Save, Follow, Connect all non-functional
3. All data hardcoded

### Fix Needed
1. Replace "Typeless" with "IGINFULL" in top bar
2. Add Convex mutations for like/save/follow (stubs if no backend yet)
3. At minimum wire the interactions to local state (persisting in sessionStorage)

### Files to touch
- `src/app/community/page.tsx`

---

## Priority 9 — Analytics → Export Report

### Problem
Export Report button non-functional.

### Fix Needed
1. Wire Export Report to generate a CSV of hardcoded data
2. Download as file

### Files to touch
- `src/app/analytics/page.tsx`

---

## Priority 10 — Navigation Flow + Next Section Buttons

### Add "Next Section" buttons throughout:
- `/ideas` "Send to Dashboard" → show toast "Go to Content →" + link to `/content`
- `/content` "Send to Editing Pipeline" → show toast + link to `/models`
- `/models` pipeline items → link to `/approvals`
- `/approvals` "Approve & Publish" → show toast + link to `/schedule`

### Sidebar improvements:
- Add flow indicator (step 1/2/3/4/5) showing current page in pipeline
- Active state highlighting

---

## API Routes to Create

### New
- `POST /api/team/invite` — invite team member
- `POST /api/analytics/export` — export CSV

### Fix
- `POST /api/generate-ideas` — already exists, needs cleanup (done ✓)

---

## Convex Functions to Add

### New
- `team/invite` — mutation: create team invite
- `settings/updateProfile` — mutation: update user profile
- `community/likePost` — action: like a community post
- `community/savePost` — action: save a community post
- `community/followCreator` — action: follow a creator

---

## Convex Schema (already exists)
```
models → name, niche, instagramHandle, avatarUrl, status, driveFolderId
ideas → modelId, niche, campaign, promptInputs, generatedBrief, status, createdAt
clips → ideaId, modelId, filename, storagePath, status, enhancedPath, mimeType
pipeline → clipId, ideaId, status, sentToEditingAt, editedAt, approvedAt, postedAt, createdAt
```

---

## Build Targets
1. ✅ `npm run build` passes
2. ✅ Ideas → real Gemini briefs (via Convex action OR Next.js API)
3. ✅ Content → clips save to Convex storage
4. ✅ Models → reads from Convex pipeline
5. ✅ Approvals → writes approved items to schedule
6. ✅ Schedule → month nav + "Schedule Post" working
7. ✅ Team → invite functional
8. ✅ Community → brand name fixed, interactions work
9. ✅ Settings → profile saves
10. ✅ Next Section navigation flow
