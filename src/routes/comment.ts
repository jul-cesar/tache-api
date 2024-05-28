import { Router } from "express";
import {
  createNewComment,
  deleteComment,
  getAllCommentsFromATask,
} from "../controllers/comment.controller";
import { jwtVerifier } from "../middlewares/session";

export const commentRouter = Router();

commentRouter.get("/:id", jwtVerifier, getAllCommentsFromATask);
commentRouter.post("/", jwtVerifier, createNewComment);
commentRouter.delete("/:id", jwtVerifier, deleteComment);
