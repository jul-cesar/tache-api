import { Router } from "express";
import { logoutController } from "../controllers/auth.controller";

export const router = Router();

router.get("/", logoutController);
