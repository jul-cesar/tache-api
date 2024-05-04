import { user } from "@prisma/client";
import { prisma } from "../config/prisma-client";
import { idServiceResponse } from "../models/IdRelatedResponse";
import { Task } from "../models/tareas";
import { Team } from "../models/team";

export const createTeam = async (data: Team) => {
  const newTeam = await prisma.team.create({ data });
  return newTeam;
};

export const deleteTeam = async (
  id: string
): Promise<idServiceResponse<string>> => {
  const teamExists = await prisma.team.findUnique({
    where: { id },
  });
  if (!teamExists) {
    return {
      success: false,
      message: "The team you are trying to delete does not exist",
    };
  }
  const deletedTask = await prisma.team.delete({ where: { id } });
  return { success: true, response: `Team  deleted` };
};

export const getUserTeams = async (
  idUser: string
): Promise<idServiceResponse<Team[]>> => {
  const userExists = prisma.user.findUnique({ where: { id: idUser } });
  if (!userExists) {
    return {
      success: false,
      message: "The user you are trying to get the team from does not exist",
    };
  }
  const userTeams = await prisma.team.findMany({
    where: {
      OR: [
        {
          members: {
            some: { id: idUser },
          },
        },
        {
          ownerId: idUser,
        },
      ],
    },
  });
  return { success: true, response: userTeams };
};

export const addMemberToTeam = async (idUser: string, idTeam: string) => {
  const teamWithMember = await prisma.team.update({
    where: { id: idTeam },
    data: {
      members: {
        connect: { id: idUser },
      },
    },
    include: {
      members: {
        select: {
          name: true,
          email: true,
          id: true,
        },
      },
      tasks: true,
    },
  });
  return teamWithMember;
};

export const getTeamTasks = async (
  teamId: string
): Promise<idServiceResponse<Task[]>> => {
  const teamExists = await prisma.team.findUnique({ where: { id: teamId } });
  if (!teamExists) {
    return {
      success: false,
      message: "the team you are trying to get the tasks from, does not exist",
    };
  }
  const teamTasks = await prisma.task.findMany({
    where: { teamId },
    include: {
      owner: {
        select: {
          name: true,
          email: true,
          id: true,
        },
      },
      asigned: {
        select: {
          name: true,
          email: true,
          id: true,
        },
      },
      team: true,
    },
  });
  return { success: true, response: teamTasks };
};
interface TeamInfo extends Team {
  members: Array<Omit<user, "password" | "refreshToken" | "email">>;
  owner: Omit<user, "password" | "refreshToken" | "email">;
}

export const getTeamInfo = async (
  idTeam: string
): Promise<idServiceResponse<TeamInfo>> => {
  const teamExists = await prisma.team.findUnique({ where: { id: idTeam } });
  if (!teamExists) {
    return {
      success: false,
      message: "The team you are trying to get the info from does not exist",
    };
  }

  const teamInfo = await prisma.team.findUnique({
    where: { id: idTeam },
    include: {
      members: {
        select: {
          name: true,
          email: true,
          id: true,
          photoURL: true,
        },
      },
      owner: {
        select: {
          name: true,
          email: true,
          id: true,
          photoURL: true,
        },
      },
    },
  });

  if (!teamInfo) {
    return {
      success: false,
      message: "Failed to fetch team info",
    };
  }

  return { success: true, response: teamInfo };
};
