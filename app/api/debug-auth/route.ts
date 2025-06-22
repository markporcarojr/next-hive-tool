// app/api/debug-auth/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const session = await auth();

    return NextResponse.json(
      {
        message: "Clerk session info",
        userId: session.userId,
        sessionId: session.sessionId,
        orgId: session.orgId,
        isSignedIn: session.userId !== null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { message: "Failed to fetch auth info", error },
      { status: 500 }
    );
  }
}
