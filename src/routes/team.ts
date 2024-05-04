import { Router } from "express";
import {
  addMember,
  DelTeam,
  postTeam,
  teamInfo,
  teamTasks,
  userTeams,
} from "../controllers/team.controller";
import { jwtVerifier } from "../middlewares/session";

export const router = Router();

router.post("/", jwtVerifier, postTeam);
router.delete("/:id", jwtVerifier, DelTeam);
router.post("/addmember/:idUser/:idTeam", jwtVerifier, addMember);
router.get("/:idUser", jwtVerifier, userTeams);
router.get("/", jwtVerifier, teamInfo);
router.get("/tasks/:teamId", jwtVerifier, teamTasks);
