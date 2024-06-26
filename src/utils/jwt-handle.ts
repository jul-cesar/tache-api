import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "";

export const generateToken = (nombre: string, email: string, id: string) => {
  const jwt = sign({ nombre, email, id }, JWT_SECRET, { expiresIn: "1d" });
  return jwt;
};

export const generateRefreshToken = (nombre: string, email: string) => {
  const jwtRefresh = sign({ nombre, email }, JWT_REFRESH_SECRET, {
    expiresIn: "30d",
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
