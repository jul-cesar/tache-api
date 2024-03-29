import { prisma } from "../config/prisma-client";
import { Request, Response } from "express";
import { generateToken, validateRefreshToken } from "../utils/jwt-handle";

interface refreshTokenResult {
  success: boolean;
  accessToken?: string;
  errorMessage?: string;
}

export const handleRefreshToken = async (
  req: Request,
  res: Response
): Promise<refreshTokenResult> => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt)
      return {
        success: false,
        errorMessage: "No se encontro un refresh token en las cookies",
      };
    const refreshToken = cookies.jwt;

    const foundUser = await prisma.user.findFirst({ where: { refreshToken } });
    if (!foundUser)
      return {
        success: false,
        errorMessage: "No se encontro un usuario asociado al refresh token",
      };

    const verifyJwt = validateRefreshToken(refreshToken);
    if (!verifyJwt)
      return { success: false, errorMessage: "El refresh token no es valido" };

    const accessToken = generateToken(foundUser.nombre, foundUser.email);
    return { success: true, accessToken };
  } catch (error) {
    console.error("Error en handleRefreshToken:", error);
    return {
      success: false,
      errorMessage: "Error al manejar el refresh token",
    };
  }
};
