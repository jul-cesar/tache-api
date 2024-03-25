import { prisma } from "../config/prisma-client";
import { Auth } from "../models/auth";
import { user } from "../models/users";
import { Encrypt, verifiedEncryptPassword } from "../utils/handle-encrypt";
import { generateToken } from "../utils/jwt-handle";

export const registerNewUser = async ({ nombre, email, password }: user) => {
  const userExists = await prisma.user.findFirst({
    where: { email: email },
  });
  const hashedPassword = await Encrypt(password);
  if (userExists) return "User already exist";
  const insertUser = await prisma.user.create({
    data: { nombre, email, password: hashedPassword },
  });
  return insertUser;
};

export const loginUser = async ({ email, password }: Auth) => {
  const userExists = await prisma.user.findFirst({
    where: { email: email },
  });
  if (!userExists) return "user not exist";

  const passwordHashed = userExists.password;
  const isVerified = await verifiedEncryptPassword(password, passwordHashed);
  if (!isVerified) return "INCORRECT PASSWORD";
  const token = generateToken(userExists.nombre, userExists.email);
  const data = {
    token,
    user: userExists,
  };
  return data;
};
