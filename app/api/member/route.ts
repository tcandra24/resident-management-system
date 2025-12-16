import { NextResponse, NextRequest } from "next/server";
import { postMember } from "@/lib/actions/member.action";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const response = await postMember(body);

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
