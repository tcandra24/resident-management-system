"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

type CreateResident = {
  name: string;
  description: string;
};

type UpdateResident = {
  id: string;
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

export const updateResident = async (formData: UpdateResident) => {
  try {
    const { id, name, description } = formData;

    const data = await prisma.resident.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });

    return {
      success: true,
      message: "Resident updated successfully",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update resident",
      error,
      data: null,
    };
  }
};

export const destroyResident = async (id: string) => {
  try {
    const data = await prisma.resident.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      message: "Resident deleted successfully",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete resident",
      error,
      data: null,
    };
  }
};
