import { hash, compare } from "bcryptjs";

export const Encrypt = async (planePassword: string) => {
  const passwordHash = await hash(planePassword, 8);
  return passwordHash;
};

export const verifiedEncryptPassword = async (
  planePassword: string,
  hashedPassword: string
) => {
  const isCorrect = compare(planePassword, hashedPassword);
  return isCorrect;
};
