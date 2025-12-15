"use server";

import prisma from "@/lib/prisma";

type CreateMember = {
  name: string;
  birth_date: Date;
  job: string;
  family_id: string;
};

export const getMembersByFamilyId = async (id: string) => {
  try {
    const data = await prisma.member.findMany({
      where: {
        family_id: id,
      },
      select: {
        id: true,
        name: true,
        birth_date: true,
        job: true,
        family_id: true,
      },
    });

    return {
      success: true,
      message: "Members fetched successfully",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch members",
      error,
      data: [],
    };
  }
};

export const postMember = async (formData: CreateMember) => {
  try {
    const { name, birth_date, job, family_id } = formData;

    const data = await prisma.member.create({
      data: {
        name,
        birth_date,
        job,
        family_id,
      },
    });

    return {
      success: true,
      message: "Member inserted successfully",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to insert member",
      error,
      data: null,
    };
  }
};
