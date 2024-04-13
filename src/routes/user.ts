import { Router } from "express";
import {
  getAllUsers,
  updateUser,
  userInfo,
} from "../controllers/user";
import { jwtVerifier } from "../middlewares/session";

export const router = Router();

router.get("/all", jwtVerifier, getAllUsers);
router.get("/:id", jwtVerifier, userInfo);
router.put("/:id", jwtVerifier, updateUser);
