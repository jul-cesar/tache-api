import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
  getAllTasksFromDb,
  getTareaById,
  getUserTasks,
  insertTask,
  removeTask,
  updateATask,
} from "../services/tareas-services";
import { requestExt } from "../models/requestExt-interface";

export const getAllTasks = async (req: requestExt, res: Response) => {
  try {
    const response = await getAllTasksFromDb();

    res.send({ data: response, user: req.user });
  } catch (error) {
    handleHttp(res, "There was an error getting all the taks", error);
  }
};

export const getAllTasksFromUser = async (req: Request, res: Response) => {
  try {
    const response = await getUserTasks(req.params.userId);
    res.send(response);
  } catch (error) {
    handleHttp(res, "There was an error getting user tasks", error);
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const response = await getTareaById(req.params.id);
    res.send(response);
  } catch (error) {
    handleHttp(res, "There was an error trying to get the task by id", error);
  }
};

export const createNewTask = async (req: Request, res: Response) => {
  try {
    const response = await insertTask(req.body);
    res.send(response);
  } catch (error) {
    handleHttp(res, "There was an error creating a new task", error);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const response = await removeTask(req.params.id);
    res.send(response);
  } catch (error) {
    handleHttp(res, "There was an error deleting the task", error);
  }
};

export const updateTasks = async (req: Request, res: Response) => {
  try {
    const response = updateATask(req.params.id, req.body);
    res.send(response);
  } catch (error) {
    handleHttp(res, "Theere was an error updating the task", error);
  }
};
