import { Router } from "express";
import { loginController, registerController } from "../controllers/auth.controller";

export const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
