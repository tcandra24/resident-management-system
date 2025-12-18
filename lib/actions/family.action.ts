"use server";

import prisma from "@/lib/prisma";

type CreateFamily = {
  identifier: string;
  house_id: string;
};

export const getDetailFamily = async (id: string) => {
  try {
    const data = await prisma.family.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        identifier: true,
      },
    });

    return {
      success: true,
      message: "Family fetched successfully",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch family",
      error,
      data: [],
    };
  }
};

export const getFamiliesByHouseId = async (id: string) => {
  try {
    const data = await prisma.family.findMany({
      where: {
        house_id: id,
      },
      select: {
        id: true,
        identifier: true,
        house_id: true,
      },
    });

    return {
      success: true,
      message: "Families fetched successfully",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch families",
      error,
      data: [],
    };
  }
};

export const postFamily = async (formData: CreateFamily) => {
  try {
    const { identifier, house_id } = formData;

    const data = await prisma.family.create({
      data: {
        identifier,
        house_id,
      },
    });

    return {
      success: true,
      message: "Family inserted successfully",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to insert family",
      error,
      data: null,
    };
  }
};
