import { Router } from "express";
import {
  createNewTask,
  deleteTask,
  expiredTasks,
  getAllTasks,
  getAllTasksFromUser,
  getOneTask,
  getUserAsignedTasks,
  updateTasks,
} from "../controllers/task.controller";
import { jwtVerifier } from "../middlewares/session";
import { validateResources } from "../middlewares/validateResources";
import { taskZodScheme } from "../schemas/taskSchema";

export const taskRouter = Router();

taskRouter.get("/", getAllTasks);
taskRouter.get("/:userId", jwtVerifier, getAllTasksFromUser);
taskRouter.get("/asigned/:userId", jwtVerifier, getUserAsignedTasks);
taskRouter.get("/byid/:id", jwtVerifier, getOneTask);
taskRouter.get("/expired/:id", jwtVerifier, expiredTasks);
taskRouter.post("/", jwtVerifier, validateResources(taskZodScheme), createNewTask);
taskRouter.put("/:id", jwtVerifier, updateTasks);
taskRouter.delete("/:id", jwtVerifier, deleteTask);
