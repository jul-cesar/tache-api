import { Router } from "express";
import { logoutController } from "../controllers/auth";

export const router = Router();

router.get("/", logoutController);
