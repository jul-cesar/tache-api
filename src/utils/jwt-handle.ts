import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const generateToken = (nombre: string, email: string) => {
  const jwt = sign({ nombre, email }, JWT_SECRET, { expiresIn: "2h" });
  return jwt;
};

export const validateToken = (jwt: string) => {
  const isJwtCorrect = verify(jwt, JWT_SECRET);
  return isJwtCorrect;
};
