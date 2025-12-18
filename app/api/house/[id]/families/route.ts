import { NextResponse, NextRequest } from "next/server";
import { getFamiliesByHouseId } from "@/lib/actions/family.action";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const response = await getFamiliesByHouseId(id);

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
