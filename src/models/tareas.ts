import { estado_tarea } from "@prisma/client";
import { prioridad_tarea } from "@prisma/client";
export interface Task {
  id: string;
  title: string;
  description: string;
  state: estado_tarea;
  priority: prioridad_tarea;
  expiringDate: Date;
  ownerId: string;
  teamId: string | null;
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
