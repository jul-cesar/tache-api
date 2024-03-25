import { Auth } from "./auth";

export interface user extends Auth {
  id: string
  nombre: string
  photoURL?: string
}
