import { comment } from "@prisma/client";
import { prisma } from "../config/prisma-client";

export const insertComment = async (data: comment) => {
  const newcomment = await prisma.comment.create({ data });
  return newcomment;
};

export const removeComment = async (id: string) => {
  const deletedComment = await prisma.comment.delete({ where: { id } });
  return deletedComment;
};

export const getTaskComments = async (idTask: string) => {
  const tasksComments = await prisma.comment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          id: true,
        },
      },
      task: true,
    },
    where: { taskId: idTask },
  });
  return tasksComments;
};
