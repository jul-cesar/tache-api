import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_REFRESH_SECRET = process.env.JWT_SECRET || "";

export const generateToken = (nombre: string, email: string) => {
  const jwt = sign({ nombre, email }, JWT_SECRET, { expiresIn: "30s" });
  return jwt;
};

export const generateRefreshToken = (nombre: string, email: string) => {
  const jwtRefresh = sign({ nombre, email }, JWT_REFRESH_SECRET, {
    expiresIn: "1d",
  });
  return jwtRefresh;
};
export const validateRefreshToken = (jwt: string) => {
  const isJwtRefreshCorrect = verify(jwt, JWT_REFRESH_SECRET);
  return isJwtRefreshCorrect;
};

export const validateToken = (jwt: string) => {
  const isJwtCorrect = verify(jwt, JWT_SECRET);
  return isJwtCorrect;
};
