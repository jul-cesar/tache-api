import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
  getTaskComments,
  insertComment,
  removeComment,
} from "../services/comentarios-services";

export const getAllCommentsFromATask = async (req: Request, res: Response) => {
  try {
    const response = await getTaskComments(req.params.id);
    res.send(response);
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
    const response = removeComment(req.params.id);
    res.send(response);
  } catch (error) {
    handleHttp(res, "There was an error deleting the comment", error);
  }
};
