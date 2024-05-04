import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
  getAllTasksFromDb,
  getAsignedTasksFromUser,
  getTaskById,
  getUserExpiredTasks,
  getUserTasks,
  insertTask,
  removeTask,
  updateATask,
} from "../services/tasks-services";
import { requestExt } from "../models/requestExt-interface";

export const getAllTasks = async (req: requestExt, res: Response) => {
  try {
    const response = await getAllTasksFromDb();

    res.send(response);
  } catch (error) {
    handleHttp(res, 500, "There was an error getting all the taks", error);
  }
};

export const getAllTasksFromUser = async (req: Request, res: Response) => {
  try {
    const response = await getUserTasks(req.params.userId);
    if (!response.success) {
      res.status(403).send(response.message);
    }
    res.send(response.response);
  } catch (error) {
    handleHttp(res, 404, "There was an error getting user tasks", error);
  }
};

export const getUserAsignedTasks = async (req: Request, res: Response) => {
  try {
    const response = await getAsignedTasksFromUser(req.params.userId);
    if (!response.success) {
      res.status(403).send(response.message);
    }
    res.send(response.response);
  } catch (error) {
    handleHttp(
      res,
      404,
      "There was an error getting the asigned task from the user",
      error
    );
  }
};

export const expiredTasks = async (req: Request, res: Response) => {
  try {
    const response = await getUserExpiredTasks(req.params.id);
    if (!response.success) {
      res.status(403).send(response.message);
    }
    res.send(response.response);
  } catch (error) {
    handleHttp(
      res,
      403,
      "There was an error getting the expired task from the user",
      error
    );
  }
};

export const getOneTask= async (req: Request, res: Response) => {
  try {
    const response = await getTaskById(req.params.id);
    res.send(response);
  } catch (error) {
    handleHttp(
      res,
      404,
      "There was an error trying to get the task by id",
      error
    );
  }
};

export const createNewTask = async (req: Request, res: Response) => {
  try {
    const response = await insertTask(req.body);
    res.send(response);
  } catch (error) {
    handleHttp(res, 403, "There was an error creating a new task", error);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const response = await removeTask(req.params.id);
    if (!response.success) {
      res.status(403).send(response.message);
    }
    res.send(response.response);
  } catch (error) {
    handleHttp(res, 404, "There was an error deleting the task", error);
  }
};

export const updateTasks = async (req: Request, res: Response) => {
  try {
    const response = await updateATask(req.params.id, req.body);
    if (!response.success) {
      res.status(403).send(response.message);
    }
    res.send(response.response);
  } catch (error) {
    handleHttp(res, 404, "Theere was an error updating the task", error);
  }
};
