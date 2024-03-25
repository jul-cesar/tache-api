import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { insertUser } from "../services/usuarios-services";
import { registerNewUser } from "../services/auth-services";

export const createNewUser = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleHttp(res, "There was an error creating the user", error);
  }
};

export const updateUser = (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleHttp(res, "There was an error updating the user", error);
  }
};

export const getAllUsers = (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

export const getUserWithEmail = (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleHttp(
      res,
      "There was an error getting the user with the email",
      error
    );
  }
};

export const getUserAsignedTasks = (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleHttp(
      res,
      "There was an error getting the asigned task from the user",
      error
    );
  }
};
