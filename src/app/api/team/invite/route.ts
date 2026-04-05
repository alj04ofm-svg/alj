import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, role, accountIds } = body as {
      name: string;
      email: string;
      role: "VA" | "Editor";
      accountIds: string[];
    };

    // Validate required fields
    if (!name || !email || !role) {
      return NextResponse.json(
        { success: false, message: "Name, email, and role are required." },
        { status: 400 }
      );
    }

    if (!["VA", "Editor"].includes(role)) {
      return NextResponse.json(
        { success: false, message: "Role must be 'VA' or 'Editor'." },
        { status: 400 }
      );
    }

    // Persist to localStorage-compatible storage note:
    // Since this is a server route, we return the invite data so the client
    // can store it. In a real app this would be saved to a database.
    const invite = {
      id: crypto.randomUUID(),
      name,
      email,
      role,
      accountIds: accountIds ?? [],
      invitedAt: new Date().toISOString(),
      status: "pending",
    };

    // For local development: the client will save to localStorage.
    // A real implementation would persist to a DB here.
    return NextResponse.json({
      success: true,
      message: `Invitation sent to ${email} as ${role}.`,
      invite,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
