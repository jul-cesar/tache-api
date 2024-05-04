import { Request, response, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
  addMemberToTeam,
  createTeam,
  deleteTeam,
  getTeamInfo,
  getTeamTasks,
  getUserTeams,
} from "../services/teams-services";

export const postTeam = async (req: Request, res: Response) => {
  try {
    const response = await createTeam(req.body);
    res.send(response);
  } catch (error) {
    handleHttp(res, 403, "there was an error creating the team", error);
  }
};

export const DelTeam = async (req: Request, res: Response) => {
  try {
    const response = await deleteTeam(req.params.id);
    if (!response.success) {
      res.status(403).send(response.message);
    }
  } catch (error) {
    handleHttp(res, 500, "there was an error deletinf the team", error);
  }
};

export const userTeams = async (req: Request, res: Response) => {
  try {
    const response = await getUserTeams(req.params.idUser);
    if (!response.success) {
      res.status(403).send(response.message);
    }
    res.send(response.response);
  } catch (error) {
    handleHttp(res, 500, "there was an error getting the teams", error);
  }
};

export const addMember = async (req: Request, res: Response) => {
  const idUser = req.params.idUser;
  const idTeam = req.params.idTeam;
  try {
    const response = await addMemberToTeam(idUser, idTeam);
    res.status(200).send(response);
  } catch (error) {
    handleHttp(
      res,
      500,
      "there was an error adding a member to the team",
      error
    );
  }
};

export const teamInfo = async (req: Request, res: Response) => {
  const idTeam = req.query.id?.toString() ?? "";
  try {
    const response = await getTeamInfo(idTeam);
    if (!response.success) {
      res.status(403).send(response.message);
    }
    res.send(response.response);
  } catch (error) {
    handleHttp(res, 500, "there was an error getting the team members", error);
  }
};

export const teamTasks = async (req: Request, res: Response) => {
  const teamId = req.params.teamId;
  try {
    const response = await getTeamTasks(teamId);
    if (!response.success) {
      res.status(403).send(response.message);
    }
    res.send(response.response);
  } catch (error) {
    handleHttp(res, 500, "There was an error getting the team tasks ", error);
  }
};
