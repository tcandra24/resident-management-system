"use server";

import prisma from "@/lib/prisma";

type CreateMember = {
  id: string;
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

export const postMember = async (formData: CreateMember[]) => {
  try {
    const queries = formData.map((item) =>
      prisma.member.upsert({
        where: {
          id: item.id,
        },
        update: {
          name: item.name,
          birth_date: new Date(item.birth_date).toISOString(),
          job: item.job,
        },
        create: {
          name: item.name,
          birth_date: new Date(item.birth_date).toISOString(),
          job: item.job,
          family_id: item.family_id,
        },
      })
    );
    const data = await prisma.$transaction(queries);

    return {
      success: true,
      message: "Members inserted successfully",
      data,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to insert member",
      error,
      data: null,
    };
  }
};
