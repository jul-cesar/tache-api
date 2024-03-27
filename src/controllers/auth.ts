import { Response, Request } from "express";
import { loginUser, registerNewUser } from "../services/auth-services";
import { handleHttp } from "../utils/error.handle";
import { handleRefreshToken } from "../services/refresh-token-service";

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
      return;
    }
    res.cookie("jwt", response.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.send({ token: response.token });
  } catch (error) {
    handleHttp(res, "Incorrect password or email", error);
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
  try {
    const response = await handleRefreshToken(req);
    if (
      response === "no cookies found" ||
      response === "no user with this refresh token" ||
      response === "token invalido"
    ) {
      res.status(403).send(response);
      return;
    }
    res.send({accessToken: response});
  } catch (error) {
    handleHttp(res, "Incorrect password or email", error);
  }
};
