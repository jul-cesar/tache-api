import { prisma } from "../config/prisma-client";
import { Request } from "express";
import {
  generateRefreshToken,
  generateToken,
  validateRefreshToken,
} from "../utils/jwt-handle";

export const handleRefreshToken = async (req: Request) => {
  const cookies = req.cookies;
  if (!cookies) return "no cookies found";
  const refreshToken = cookies.jwt;

  const foundUser = await prisma.user.findFirst({ where: {refreshToken} });
  if (!foundUser) return "no user with this refresh token";

  const verifyJwt = validateRefreshToken(refreshToken);
  if (!verifyJwt) return "token invalido";

  const accessToken = generateToken(foundUser.nombre, foundUser.email);
  return accessToken;
};
