import { NextFunction, Request, Response } from "express";

export const logMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("loggin...");
  next();
};
