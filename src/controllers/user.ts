import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { allUsers } from "../services/usuarios-services";

export const updateUser = (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleHttp(res, "There was an error updating the user", error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const response = await allUsers();
    res.send(response);
  } catch (error) {
    handleHttp(res, "There was an error getting all the users", error);
  }
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
