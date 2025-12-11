"use server";

import prisma from "../prisma";

type CreateHouse = {
  number: string;
  address: string;
};

export const getAllHouses = async (id: string) => {
  try {
    const data = await prisma.house.findMany({
      where: {
        resident_id: id,
      },
    });

    return {
      success: true,
      message: "Houses fetched successfully",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch houses",
      error,
      data: [],
    };
  }
};

export const postHouse = async (resident_id: string, formData: CreateHouse) => {
  try {
    const { number, address } = formData;

    const data = await prisma.house.create({
      data: {
        number,
        address,
        resident_id,
      },
    });

    return {
      success: true,
      message: "House inserted successfully",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to insert house",
      error,
      data: null,
    };
  }
};
