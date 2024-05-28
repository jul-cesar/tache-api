import { Router } from "express";
import {
  addMember,
  deleteMemberFromTeam,
  DelTeam,
  postTeam,
  teamInfo,
  teamTasks,
  userTeams,
} from "../controllers/team.controller";
import { jwtVerifier } from "../middlewares/session";

export const teamRouter = Router();

teamRouter.post("/", jwtVerifier, postTeam);

teamRouter.delete("/:id", jwtVerifier, DelTeam);
teamRouter.put("/addmember/:emailUser/:idTeam", jwtVerifier, addMember);
teamRouter.put("/delmember/:idUser/:idTeam", deleteMemberFromTeam);
teamRouter.get("/:idUser", jwtVerifier, userTeams);
teamRouter.get("/", jwtVerifier, teamInfo);
teamRouter.get("/tasks/:teamId", jwtVerifier, teamTasks);
