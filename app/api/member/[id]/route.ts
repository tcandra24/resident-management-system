import { NextResponse, NextRequest } from "next/server";
import { getMembersByFamilyId } from "@/lib/actions/member.action";

export const GET = async (request: NextRequest, { params }: { params: Promise<{ member_id: string }> }) => {
  //
};
