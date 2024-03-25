import { Router } from "express";
import {
  createNewUser,
  getAllUsers,
  getUserAsignedTasks,
  getUserWithEmail,
  updateUser,
} from "../controllers/user";
import { jwtVerifier } from "../middlewares/session";

export const router = Router();

router.get("/all", jwtVerifier, getAllUsers);
router.get("/:email", jwtVerifier, getUserWithEmail);
router.get("/asignedtasks/:id", jwtVerifier, getUserAsignedTasks);
router.post("/", jwtVerifier, createNewUser);
router.put("/:id", jwtVerifier, updateUser);
