import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validateResources =
  (scheme: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      scheme.parse(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json(
            error.issues.map((issue) => ({
              path: issue.path,
              message: issue.message,
            }))
          );
      }
      return res.status(400).send(error.errors);
    }
  };
