"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

type CreateResident = {
  name: string;
  description: string;
};

export const getAllResidents = async () => {
  try {
    const { userId: user } = await auth();

    const data = await prisma.resident.findMany({
      where: {
        user_id: user!,
      },
    });

    return {
      success: true,
      message: "Residents fetched successfully",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch residents",
      error,
      data: [],
    };
  }
};

export const getDetailResident = async (id: string) => {
  try {
    const { userId: user } = await auth();

    const data = await prisma.resident.findFirst({
      where: {
        id: id,
        user_id: user!,
      },
    });

    return {
      success: true,
      message: "Resident fetched successfully",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch resident",
      error,
      data: null,
    };
  }
};

export const postResident = async (formData: CreateResident) => {
  try {
    const { userId: user } = await auth();
    const { name, description } = formData;

    const data = await prisma.resident.create({
      data: {
        name,
        description,
        user_id: user!,
      },
    });

    return {
      success: true,
      message: "Resident inserted successfully",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to insert resident",
      error,
      data: null,
    };
  }
};
