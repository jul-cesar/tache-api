import { prisma } from "../config/prisma-client";

export const createNotification = async (
  idUser: string,
  title: string,
  description: string
) => {
  const newNotification = await prisma.notification.create({
    data: {
      description,
      title,
      ownerId: idUser,
    },
  });
  return newNotification;
};

export const getUserNotifications = async (idUser: string) => {
  const userNotifications = await prisma.notification.findMany({
    where: {
      ownerId: idUser,
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return userNotifications;
};
