import { prisma } from "../config/prisma-client";
import { Auth } from "../models/auth";
import { user } from "../models/users";
import { Encrypt, verifiedEncryptPassword } from "../utils/handle-encrypt";
import { generateRefreshToken, generateToken } from "../utils/jwt-handle";
import { createTeam } from "./teams-services";

export const registerNewUser = async ({ nombre, email, password }: user) => {
  const userExists = await prisma.user.findFirst({
    where: { email: email },
  });
  const hashedPassword = await Encrypt(password);
  if (userExists) return "User already exist";
  const newUser = await prisma.user.create({
    data: { nombre, email, password: hashedPassword },
  });
  createTeam({
    nombre: `${nombre.replace(" ", "-")}s-team`,
    ownerId: newUser.id,
  });
  return { message: "user registrado correctamente" };
};

export const loginUser = async ({ email, password }: Auth) => {
  const userExists = await prisma.user.findFirst({
    where: { email: email },
  });
  if (!userExists) return "user not exist";

  const passwordHashed = userExists.password;
  const isVerified = await verifiedEncryptPassword(password, passwordHashed);
  if (!isVerified) return "INCORRECT PASSWORD";
  const token = generateToken(
    userExists.nombre,
    userExists.email,
    userExists.id
  );
  const refreshToken = generateRefreshToken(
    userExists.nombre,
    userExists.email
  );
  await prisma.user.update({
    where: { email },
    data: { refreshToken: refreshToken },
  });
  const data = {
    token,
    refreshToken,
  };
  return data;
};
