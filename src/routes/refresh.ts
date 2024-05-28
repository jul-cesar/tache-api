import { Router } from "express";
import { refreshTokenController } from "../controllers/auth.controller";

export const refreshRouter = Router();

refreshRouter.get("/", refreshTokenController);
