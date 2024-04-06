import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

export const validateResources =
  (scheme: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      scheme.parse({
        body: req.body,
      });
      next();
    } catch (error: any) {
      return res.status(400).send(error.errors);
    }
  };
