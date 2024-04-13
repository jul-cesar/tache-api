import { prisma } from "../config/prisma-client";
import { user } from "../models/users";

export const insertUser = async (data: user) => {
  const newUser = await prisma.user.create({ data });
  return newUser;
};

export const allUsers = async () => {
  const allUsers = await prisma.user.findMany();
  return allUsers;
};

export const getUserInfo = async (idUser: string) => {
  const userInfo = await prisma.user.findFirst({ where: { id: idUser }, });
  return userInfo;
};
