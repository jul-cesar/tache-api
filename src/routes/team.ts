import { Router } from "express";
import { addMember, postTeam } from "../controllers/team";

export const router = Router();

router.post("/", postTeam);
router.post('/addmember/:idUser/:idTeam', addMember)
