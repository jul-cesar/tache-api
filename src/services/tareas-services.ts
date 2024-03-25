import { prisma } from "../config/prisma-client";
import { task } from "../models/tareas";

export const insertTask = async (data: task) => {
  const newTarea = await prisma.tarea.create({ data });
  return newTarea;
};

export const getUserTasks = async (userId: string) => {
  const userTareas = await prisma.tarea.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: { owner: true, asignado: true },
    where: { ownerId: userId },
  });
  return userTareas;
};

export const getAllTasksFromDb = async () => {
  const allTasks = await prisma.tarea.findMany();
  return allTasks;
};

export const updateATask = async (id: string, data: task) => {
  const updatedTask = await prisma.tarea.update({
    where: { id },
    data,
  });
  return updatedTask;
};

export const removeTask = async (id: string) => {
  const deletedTask = await prisma.tarea.delete({
    where: { id },
  });
  return deletedTask;
};

export const getTareaById = async (id: string) => {
  const foundTasks = await prisma.tarea.findFirst({
    where: { id },
  });
  return foundTasks;
};
