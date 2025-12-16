import { NextResponse, NextRequest } from "next/server";
import { destroyMember } from "@/lib/actions/member.action";

export const DELETE = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;

    const response = await destroyMember(id);
    if (!response.success) {
      throw new Error(response.message);
    }

    return NextResponse.json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (error: Error | unknown) {
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "An unexpected error occurred",
      error,
    });
  }
};
