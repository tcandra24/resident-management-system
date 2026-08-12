import { NextResponse, NextRequest } from "next/server";
import { getAllResidents } from "@/lib/actions/resident.action";

export async function GET(request: NextRequest) {
  try {
    const response = await getAllResidents();

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
    });
  }
}
