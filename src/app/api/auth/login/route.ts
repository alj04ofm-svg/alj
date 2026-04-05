import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // TODO: replace with real Supabase auth
    // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    // if (error) return NextResponse.json({ error: error.message }, { status: 401 });

    // Simulation: accept any valid-looking credentials
    if (email.includes("@") && password.length >= 6) {
      const response = NextResponse.json({ ok: true });
      response.cookies.set("iginfull-session", Buffer.from(email).toString("base64"), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });
      return response;
    }

    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
