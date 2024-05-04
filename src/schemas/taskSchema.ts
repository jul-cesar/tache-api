import { z } from "zod";

const Prioridades = z.enum(["alta", "media", "baja"], {
  errorMap: () => ({
    message: "Por favor, elige una prioridad válida: Alta, Media, Baja",
  }),
});

const Estados = z.enum(["pendiente", "progreso", "completado"], {
  errorMap: () => ({
    message:
      "Por favor, elige un estado válido: Pendiente, En Progreso, Completado",
  }),
});

export const taskZodScheme = z.object({
  title: z
    .string()
    .min(3, { message: "Mínimo 4 caracteres" })
    .max(25, { message: "Máximo 44 caracteres" }),
  description: z
    .string()
    .min(2, { message: "Mínimo 4 caracteres" })
    .max(220, { message: "Máximo 220 caracteres" }),
  priority: Prioridades,
  expiringDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Fecha inválida. Asegúrate de usar el formato correcto.",
  }),
  state: Estados,
  ownerId: z
    .string()
    .min(1, { message: "Se requiere el ID del propietario" })
    .uuid(),
  teamId: z.string().min(1, { message: "Se requiere el ID del team" }).uuid(),
});
