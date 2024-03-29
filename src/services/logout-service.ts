import { Request, Response } from "express";
import { prisma } from "../config/prisma-client";

interface LogoutResult {
  success: boolean;
  message?: string;
}
export const handleLogout = async (
  req: Request,
  res: Response
): Promise<LogoutResult> => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return { success: true };

    const refreshToken: string = cookies.jwt;

    const foundUser = await prisma.user.findFirst({
      where: { refreshToken },
    });

    if (!foundUser) {
      res.clearCookie("jwt", { httpOnly: true });
      return { success: true };
    }

    await prisma.user.update({
      where: { id: foundUser.id },
      data: { refreshToken: null },
    });

    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return { success: true };
  } catch (error) {
    console.error("Error en handleLogout:", error);
    return { success: false, message: "Error al cerrar sesión" };
  }
};
