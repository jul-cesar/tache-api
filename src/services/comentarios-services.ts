import { comentario } from "@prisma/client";
import { prisma } from "../config/prisma-client";

export const insertComment = async (data: comentario) => {
  const newComentario = await prisma.comentario.create({ data });
  return newComentario;
};


