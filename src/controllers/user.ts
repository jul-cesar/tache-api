import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { allUsers, getUserInfo } from "../services/usuarios-services";

export const updateUser = (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleHttp(res, 403, "There was an error updating the user", error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const response = await allUsers();
    res.send(response);
  } catch (error) {
    handleHttp(res, 500, "There was an error getting all the users", error);
  }
};

export const userInfo = async (req: Request, res: Response) => {
  try {
    const response = await getUserInfo(req.params.id);
    res.send({
      nombre: response?.nombre,
      email: response?.email,
      photoURL: response?.photoURL,
      id: response?.id,
      nroComentarios: response?.comentario.length,
      nroTareasAsignadas: response?.tareasAsignadas.length,
      nroTareasCreadas: response?.tareasCreadas.length,
    });
  } catch (error) {
    handleHttp(res, 403, "There was an error getting the user info", error);
  }
};
