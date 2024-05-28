import { Router } from "express";
import {
  getAllUsers,
  updateUser,
  userInfo,
} from "../controllers/user.controller";
import { jwtVerifier } from "../middlewares/session";

export const userRouter = Router();

userRouter.get("/all", jwtVerifier, getAllUsers);
userRouter.get("/:id", jwtVerifier, userInfo);
userRouter.put("/:id", jwtVerifier, updateUser);
