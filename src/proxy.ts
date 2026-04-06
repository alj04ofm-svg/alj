/**
 * NVA Agency Dashboard — Next.js 16 proxy (auth middleware)
 *
 * In Next.js 16, the file is named proxy.ts (not middleware.ts).
 * The function MUST be named `proxy` (not `middleware`).
 *
 * Auth flow: checks for iginfull-session cookie, redirects to /login if missing.
 * Add routes to PROTECTED_ROUTES as the app grows.
 */

import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = [
  "/schedule",
  "/models",
  "/analytics",
  "/approvals",
  "/team",
  "/settings",
];

const AUTH_PATH = "/login";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  if (!isProtected) return NextResponse.next();

  const session = req.cookies.get("iginfull-session");
  if (session?.value) return NextResponse.next();

  const loginUrl = new URL(AUTH_PATH, req.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  // Match all routes except static assets, API routes, and Next internals
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public|.*\\..*).*)",
  ],
};
