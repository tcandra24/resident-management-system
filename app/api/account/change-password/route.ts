import { NextResponse, NextRequest } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function PUT(request: NextRequest) {
  try {
    const { userId, sessionId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User not authenticated",
        },
        { status: 401 },
      );
    }

    const { currentPassword, newPassword } = await request.json();
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Current password and new password are required",
        },
        { status: 400 },
      );
    }

    const client = await clerkClient();

    const { verified } = await client.users.verifyPassword({ userId, password: currentPassword });

    if (!verified) {
      return NextResponse.json(
        {
          success: false,
          message: "Current password is incorrect",
        },
        { status: 400 },
      );
    }

    await client.users.updateUser(userId, {
      password: newPassword,
    });

    // Optional but recommended: revoke other active sessions after a password change.
    const sessions = await client.sessions.getSessionList({ userId });
    await Promise.all(sessions.data.filter((session) => session.id !== sessionId).map((session) => client.sessions.revokeSession(session.id)));

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error: Error | unknown) {
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "An unexpected error occurred",
    });
  }
}
