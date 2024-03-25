import { Router } from "express";
import {
  createNewTask,
  deleteTask,
  getAllTasks,
  getAllTasksFromUser,
  getTaskById,
  updateTasks,
} from "../controllers/tarea";
import { jwtVerifier } from "../middlewares/session";

export const router = Router();

router.get("/", jwtVerifier, getAllTasks);
router.get("/:userId", jwtVerifier, getAllTasksFromUser);
router.get("/byid/:id", jwtVerifier, getTaskById);
router.post("/", jwtVerifier, createNewTask);
router.put("/:id", jwtVerifier, updateTasks);
router.delete("/:id", jwtVerifier, deleteTask);
