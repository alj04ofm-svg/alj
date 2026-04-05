import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/schedule", "/models", "/analytics", "/approvals", "/team", "/settings"];
const AUTH_PATH = "/login";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
  if (!isProtected) return NextResponse.next();

  const session = req.cookies.get("iginfull-session");
  if (session) return NextResponse.next();

  // Redirect unauthenticated users to login
  const loginUrl = new URL(AUTH_PATH, req.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
