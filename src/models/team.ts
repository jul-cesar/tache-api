import { string } from "zod";
import { user } from "./users";

export interface Team {
  id?: string;
  name: string;
  ownerId: string;
  createdAt?: Date;
}
