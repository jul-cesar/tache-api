import { Router } from "express";
import { loginController, registerController } from "../controllers/auth";

export const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
