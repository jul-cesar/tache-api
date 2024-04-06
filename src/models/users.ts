import { z } from "zod";
import { Auth } from "./auth";

export interface user extends Auth {
  id: string;
  nombre: string;
  photoURL?: string;
  refreshToken?: string;
}

export const userZodScheme = z.object({
  nombre: z
    .string({ required_error: "por favor ingresa un nombre" })
    .min(3, { message: "el nombre debe ser de al menos 3 caracteres" }),
  photoURL: z
    .string()
    .min(10)
    .url({ message: "por favor ingresa una url valida" }),
  refreshToken: z.string(),
});
