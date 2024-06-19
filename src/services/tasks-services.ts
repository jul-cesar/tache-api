import { prisma } from "../config/prisma-client";
import { idServiceResponse } from "../models/IdRelatedResponse";
import { Task } from "../models/tareas";
import { createNotification } from "./notification-service";

export const insertTask = async (data: Task) => {
  const newtask = await prisma.task.create({
    data,
    include: {
      owner: {
        select: {
          name: true,
          email: true,
          id: true,
        },
      },
      team: true,
    },
  });
  return newtask;
};

export const getUserTasks = async (
  userId: string
): Promise<idServiceResponse<Task[]>> => {
  const userExists = prisma.user.findUnique({ where: { id: userId } });
  if (!userExists) {
    return {
      success: false,
      message: "The user you are trying to get the tasks from does not exist",
    };
  }
  const usertasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      owner: {
        select: {
          name: true,
          email: true,
          id: true,
        },
      },
      team: true,
    },
    where: { ownerId: userId },
  });

  return { success: true, response: usertasks };
};

export const getUserExpiredTasks = async (
  id: string
): Promise<idServiceResponse<Task[]>> => {
  const userExists = prisma.user.findUnique({ where: { id } });
  if (!userExists) {
    return {
      success: false,
      message:
        "The user you are trying to get the expired tasks from does not exist",
    };
  }
  const expiredTasks = await prisma.task.findMany({
    include: {
      owner: {
        select: {
          name: true,
          email: true,
          id: true,
        },
      },
      team: true,
    },
    where: {
      ownerId: id,
      expiringDate: {
        lt: new Date(),
      },
    },
  });
  return { success: true, response: expiredTasks };
};

export const getAsignedTasksFromUser = async (
  idUser: string
): Promise<idServiceResponse<Task[]>> => {
  const userExists = prisma.user.findUnique({ where: { id: idUser } });
  if (!userExists) {
    return {
      success: false,
      message:
        "The user you are trying to get the asigned tasks from does not exist",
    };
  }
  const asignedTasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      owner: {
        select: {
          name: true,
          email: true,
          id: true,
        },
      },
    },
    where: { asignedId: idUser },
  });
  return { success: true, response: asignedTasks };
};

export const getAllTasksFromDb = async () => {
  const allTasks = await prisma.task.findMany();
  return allTasks;
};

export const updateATask = async (
  id: string,
  data: Task
): Promise<idServiceResponse<Task>> => {
  const taskExists = prisma.task.findUnique({ where: { id } });
  if (!taskExists) {
    return {
      success: false,
      message: "The task you are trying to update does not exist",
    };
  }
  const updatedTask = await prisma.task.update({
    where: { id },
    data,
  });
  if(data.asignedId){
    await createNotification(data.asignedId, `Se te ha asignado la tarea: ${data.title}`, "El admin de un team te asigno una tarea")
  }
  return { success: true, response: updatedTask };
};

export const removeTask = async (
  id: string
): Promise<idServiceResponse<Task>> => {
  const taskExist = await prisma.task.findUnique({ where: { id } });
  if (!taskExist) {
    return {
      success: false,
      message: "The task you are trying to delete does not exist",
    };
  }
  const deletedTask = await prisma.task.delete({
    where: { id },
  });
  return { success: true, response: deletedTask };
};

export const getTaskById = async (id: string) => {
  const foundTasks = await prisma.task.findFirst({
    where: { id },
  });
  return foundTasks;
};
