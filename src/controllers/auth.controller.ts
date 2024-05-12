import { Response, Request } from "express";
import { loginUser, registerNewUser } from "../services/auth-services";
import { handleHttp } from "../utils/error.handle";
import { handleRefreshToken } from "../services/refresh-token-service";
import { handleLogout } from "../services/logout-service";

export const registerController = async (req: Request, res: Response) => {
  try {
    const response = await registerNewUser(req.body);

    if (response === "User already exist") {
      res.status(403).send(response);
    } else {
      res.send(response);
    }
  } catch (error) {
    handleHttp(res, 500, "Error al registrar el usuario", error);
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const response = await loginUser(req.body);
    if (response === "INCORRECT PASSWORD" || response === "user not exist") {
      const errorMessage =
        response === "INCORRECT PASSWORD"
          ? "Contraseña incorrecta"
          : "Usuario no existente";
      res.status(403).send({ error: errorMessage });
      return;
    }
    res.cookie("jwt", response.refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.send({ token: response.token });
  } catch (error) {
    handleHttp(res, 500, "Incorrect password or email", error);
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
  try {
    const response = await handleRefreshToken(req);
    if (response.success) {
      res.send({ accessToken: response.accessToken });
    } else {
      res.status(403).send(response.errorMessage);
    }
  } catch (error) {
    console.error("Error en refreshTokenController:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export const logoutController = async (req: Request, res: Response) => {
  try {
    const response = await handleLogout(req, res);
    if (response.success) {
      res.sendStatus(204);
    } else {
      res.status(500).send(response.message);
    }
  } catch (error) {
    console.error("Error en logoutController:", error);
    handleHttp(res, 403, "Error al cerrar sesión", error);
  }
};
