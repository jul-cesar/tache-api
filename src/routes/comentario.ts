import { Router } from "express";
import {
  createNewComment,
  deleteComment,
  getAllCommentsFromATask,
} from "../controllers/comentario";
import { jwtVerifier } from "../middlewares/session";

export const router = Router();

router.get("/:id", jwtVerifier, getAllCommentsFromATask);
router.post("/", jwtVerifier, createNewComment);
router.delete("/:id", jwtVerifier, deleteComment);
