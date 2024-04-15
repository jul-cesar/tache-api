import { Response } from "express";

export const handleHttp = (res: Response, status: number, error: string, errorRaw: any) => {
  console.error(errorRaw);
  res.status(status);
  res.send(error);
};
