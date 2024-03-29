import { comentario } from "@prisma/client";
import { prisma } from "../config/prisma-client";

export const insertComment = async (data: comentario) => {
  const newComentario = await prisma.comentario.create({ data });
  return newComentario;
};

export const removeComment = async (id: string) => {
  const deletedComment = await prisma.comentario.delete({ where: { id } });
  return deletedComment;
};

export const getTaskComments = async (idTask: string) => {
  const tasksComments = await prisma.comentario.findMany({
    orderBy: {
      fecha: "desc",
    },
    include: {
      user: true,
      tarea: true,
    },
    where: { tareaId: idTask },
  });
  return tasksComments;
};
