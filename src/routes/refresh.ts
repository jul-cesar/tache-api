import { Router } from "express";
import { refreshTokenController } from "../controllers/auth";
import { jwtVerifier } from "../middlewares/session";

export const router = Router();

router.get("/",  refreshTokenController);
