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

    const mappingData = data.map((member) => {
      const birth_date = new Date(member.birth_date);

      return {
        ...member,
        birth_date: `${birth_date.getFullYear()}-${birth_date.getMonth()}-${birth_date.getDate()}`,
      };
    });

    return {
      success: true,
      message: "Members fetched successfully",
      data: mappingData,
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
    return {
      success: false,
      message: "Failed to insert member",
      error,
      data: null,
    };
  }
};

export const destroyMember = async (id: string) => {
  try {
    const data = await prisma.member.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      message: "Members deleted successfully",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete member",
      error,
      data: null,
    };
  }
};
