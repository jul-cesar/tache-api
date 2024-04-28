import { Router } from "express";
import {
  createNewTask,
  deleteTask,
  expiredTasks,
  getAllTasks,
  getAllTasksFromUser,
  getTaskById,
  getUserAsignedTasks,
  teamTasks,
  updateTasks,
} from "../controllers/tarea";
import { jwtVerifier } from "../middlewares/session";

export const router = Router();

router.get("/", getAllTasks);
router.get("/:userId", jwtVerifier, getAllTasksFromUser);
router.get("/asigned/:userId", jwtVerifier, getUserAsignedTasks);
router.get("/byid/:id", jwtVerifier, getTaskById);
router.get("/expired/:id", jwtVerifier, expiredTasks);
router.get("/team/:teamId", teamTasks);
router.post("/", jwtVerifier, createNewTask);
router.put("/:id", jwtVerifier, updateTasks);
router.delete("/:id", jwtVerifier, deleteTask);
