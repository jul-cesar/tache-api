import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { insertComment } from "../services/comentarios-services";

export const getAllCommentsFromATask = (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleHttp(
      res,
      "There was an error getting all the comments from the task",
      error
    );
  }
};

export const createNewComment = async (req: Request, res: Response) => {
  try {
    const response = await insertComment(req.body);
    res.send(response);
  } catch (error) {
    handleHttp(res, "There was an error creating the comment", error);
  }
};

export const deleteComment = (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleHttp(res, "There was an error deleting the comment", error);
  }
};
