import { Router } from "express";
import { getUserNotificationsController } from "../controllers/notification.controller";

export const notificationRouter = Router();

notificationRouter.get("/:idUser", getUserNotificationsController);
