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

export const router = Router();

router.get("/", getAllTasks);
router.get("/:userId", jwtVerifier, getAllTasksFromUser);
router.get("/asigned/:userId", jwtVerifier, getUserAsignedTasks);
router.get("/byid/:id", jwtVerifier, getOneTask);
router.get("/expired/:id", jwtVerifier, expiredTasks);
router.post("/", jwtVerifier, validateResources(taskZodScheme), createNewTask);
router.put("/:id", jwtVerifier, updateTasks);
router.delete("/:id", jwtVerifier, deleteTask);
