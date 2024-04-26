import { string } from "zod";
import { user } from "./users";
import { task } from "./tareas";

export interface Team {
  id?: string;
  nombre: string;
  ownerId: string;
  createdA?: Date;
}
