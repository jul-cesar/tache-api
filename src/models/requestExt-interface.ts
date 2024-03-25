import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface requestExt extends Request {
  user?: string | JwtPayload;
}
