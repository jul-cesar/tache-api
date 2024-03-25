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
