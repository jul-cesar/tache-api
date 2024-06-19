import { Request, Response } from "express";
import { getUserNotifications } from "../services/notification-service";
import { handleHttp } from "../utils/error.handle";
export const getUserNotificationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const response = await getUserNotifications(req.params.idUser);
    res.send(response);
  } catch (error) {
    handleHttp(
      res,
      500,
      "There was an error getting user notifications",
      error
    );
  }
};
