import { Router } from "express";
import { refreshTokenController } from "../controllers/auth";

export const router = Router();

router.get("/",  refreshTokenController);
