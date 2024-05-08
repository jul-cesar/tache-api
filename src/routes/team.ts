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

export const router = Router();

router.post("/", jwtVerifier, postTeam);

router.delete("/:id", jwtVerifier, DelTeam);
router.put("/addmember/:emailUser/:idTeam", jwtVerifier, addMember);
router.put("/delmember/:idUser/:idTeam", deleteMemberFromTeam);
router.get("/:idUser", jwtVerifier, userTeams);
router.get("/", jwtVerifier, teamInfo);
router.get("/tasks/:teamId", jwtVerifier, teamTasks);
