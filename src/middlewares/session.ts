import { Response, NextFunction } from "express";
import { validateToken } from "../utils/jwt-handle";
import { requestExt } from "../models/requestExt-interface";

export const jwtVerifier = (
  req: requestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const userJwt = req.headers.authorization || "";
    if (!userJwt) return res.sendStatus(403);
    const jwt = userJwt.split(" ").pop();
    const isUser = validateToken(`${jwt}`);
    if (!isUser) {
      res.status(401);
    } else {
      req.user = isUser;
      next();
    }
  } catch (error) {
    res.status(401).send("tu sesion no es valida");
  }
};
