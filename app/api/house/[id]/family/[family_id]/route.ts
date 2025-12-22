import { NextResponse, NextRequest } from "next/server";
import { getMembersByFamilyId } from "@/lib/actions/member.action";
import { updateFamily, destroyFamily } from "@/lib/actions/family.action";

export const GET = async (request: NextRequest, { params }: { params: Promise<{ family_id: string }> }) => {
  try {
    const { family_id } = await params;
    const response = await getMembersByFamilyId(family_id);

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
};

export const PUT = async (request: NextRequest, { params }: { params: Promise<{ id: string; family_id: string }> }) => {
  try {
    const { id, family_id } = await params;
    const body = await request.json();

    const response = await updateFamily({ id: family_id, identifier: body.identifier, house_id: id });

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
};

export const DELETE = async (request: NextRequest, { params }: { params: Promise<{ family_id: string }> }) => {
  try {
    const { family_id: id } = await params;

    const response = await destroyFamily(id);

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
};
