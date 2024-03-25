import { Response } from "express";

export const handleHttp = (res: Response, error: string, errorRaw: any) => {
  console.error(errorRaw);
  res.status(403);
  res.send(error);
};
