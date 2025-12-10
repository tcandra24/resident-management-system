"use server";

import { auth } from "@clerk/nextjs/server";

type CreateResident = {
  name: string;
  description: string;
};

export const getAllResidents = async () => {
  const data = await auth();
  console.log(data);
};

export const postResident = async (formData: CreateResident) => {
  const { userId: user } = await auth();
  console.log(user, formData);
};
