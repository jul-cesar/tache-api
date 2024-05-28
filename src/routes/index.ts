import { Router } from "express";
import { authRouter } from "./auth";
import { commentRouter } from "./comment";
import { taskRouter } from "./task";
import { teamRouter } from "./team";
import { userRouter } from "./user";
import { refreshRouter } from "./refresh";
import { LogOutrouter } from "./logout";


const router = Router();

router.use("/auth", authRouter);
router.use("/comment", commentRouter);
router.use("/task", taskRouter);
router.use("/team", teamRouter);
router.use("/user", userRouter);
router.use("/refresh", refreshRouter);
router.use("/logout", LogOutrouter);

export { router };
