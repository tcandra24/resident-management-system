import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function DELETE() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User not authenticated",
        },
        { status: 401 },
      );
    }

    const client = await clerkClient();
    await client.users.deleteUser(userId);

    return NextResponse.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error: Error | unknown) {
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "An unexpected error occurred",
    });
  }
}
