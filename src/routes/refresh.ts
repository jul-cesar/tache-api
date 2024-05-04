import { Router } from "express";
import { refreshTokenController } from "../controllers/auth.controller";

export const router = Router();

router.get("/", refreshTokenController);
