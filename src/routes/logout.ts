import { Router } from "express";
import { logoutController } from "../controllers/auth.controller";

export const LogOutrouter = Router();

LogOutrouter.get("/", logoutController);
