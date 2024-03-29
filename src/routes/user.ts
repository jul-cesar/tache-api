import { Router } from "express";
import {
  getAllUsers,
  getUserWithEmail,
  updateUser,
} from "../controllers/user";
import { jwtVerifier } from "../middlewares/session";

export const router = Router();

router.get("/all", jwtVerifier, getAllUsers);
router.get("/:email", jwtVerifier, getUserWithEmail);
router.put("/:id", jwtVerifier, updateUser);
