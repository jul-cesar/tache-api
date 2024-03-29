import { prisma } from "../config/prisma-client";
import { user } from "../models/users";

export const insertUser = async (data: user) => {
  const newUser = await prisma.user.create({ data });
  return newUser;
};


