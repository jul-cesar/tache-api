import { prisma } from "../config/prisma-client";
import { task } from "../models/tareas";

export const insertTask = async (data: task) => {
  const newTarea = await prisma.tarea.create({
    data,
    include: {
      owner: {
        select: {
          nombre: true,
          email: true,
          id: true,
        },
      },
      team: true,
    },
  });
  return newTarea;
};

export const getUserTasks = async (userId: string) => {
  const userTareas = await prisma.tarea.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      owner: {
        select: {
          nombre: true,
          email: true,
          id: true,
        },
      },
      team: true,
    },
    where: { ownerId: userId },
  });

  return userTareas;
};


export const getUserExpiredTasks = async (id: string) => {
  const expiredTasks = await prisma.tarea.findMany({
    include: {
      owner: {
        select: {
          nombre: true,
          email: true,
          id: true,
        },
      },
      team: true,
    },
    where: {
      ownerId: id,
      fechaVencimiento: {
        lt: new Date(),
      },
    },
  });
  return expiredTasks;
};

export const getTeamTasks = async (teamId: string) => {
  const teamTasks = await prisma.tarea.findMany({
    where: { teamId },
    include: {
      owner: {
        select: {
          nombre: true,
          email: true,
          id: true,
        },
      },
      asignado: {
        select: {
          nombre: true,
          email: true,
          id: true,
        },
      },
      team: true,
    },
  });
  return teamTasks;
};

export const getAsignedTasksFromUser = async (idUser: string) => {
  const asignedTasks = await prisma.tarea.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      owner: {
        select: {
          nombre: true,
          email: true,
          id: true,
        },
      },
    },
    where: { asignadoId: idUser },
  });
  return asignedTasks;
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
