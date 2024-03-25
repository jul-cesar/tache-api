import { Response, Request } from "express";
import { loginUser, registerNewUser } from "../services/auth-services";
import { handleHttp } from "../utils/error.handle";

export const registerController = async (req: Request, res: Response) => {
  try {
    const response = await registerNewUser(req.body);
    if (response === "User already exist") {
      res.status(403).send(response);
    }
    res.send(response);
  } catch (error) {
    handleHttp(res, "Error al registrar el usuario", error);
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const response = await loginUser(req.body);
    if (response === "INCORRECT PASSWORD" || response === "user not exist") {
      res.status(403).send(response);
    }
    res.send(response);
  } catch (error) {
    handleHttp(res, "Incorrect password or email", error);
  }
};
