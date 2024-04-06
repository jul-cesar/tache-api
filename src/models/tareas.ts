import { z } from "zod";

export interface task {
  id: string;
  titulo: string;
  descripcion: string;
  estado: estado_tarea_interf;
  prioridad: prioridad_tarea_interf;
  fechaVencimiento: Date;
  ownerId: string;
}

export enum estado_tarea_interf {
  pendiente = "pendiente",
  progreso = "progreso",
  completada = "completada",
}

export enum prioridad_tarea_interf {
  baja = "baja",
  media = "media",
  alta = "alta",
}

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

export const tareaZodScheme = z.object({
  titulo: z
    .string()
    .min(4, { message: "Mínimo 4 caracteres" })
    .max(44, { message: "Máximo 44 caracteres" }),
  descripcion: z
    .string()
    .min(4, { message: "Mínimo 4 caracteres" })
    .max(220, { message: "Máximo 220 caracteres" }),
  prioridad: Prioridades,
  fechaVencimiento: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Fecha inválida. Asegúrate de usar el formato correcto.",
  }),
  estado: Estados,
  ownerId: z.string().min(1, { message: "Se requiere el ID del propietario" }),
  asignadoId: z
    .string()
    .min(1, { message: "Se requiere el ID del asignado" })
    .optional(),
});
