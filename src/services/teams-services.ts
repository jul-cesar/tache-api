import { team, user } from "@prisma/client";
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
  await prisma.team.delete({ where: { id } });
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
    include: {
      owner: {
        select: {
          name: true,
          email: true,
          id: true,
        },
      },
    },
  });
  return { success: true, response: userTeams };
};

export const addMemberToTeam = async (
  emailUser: string,
  idTeam: string
): Promise<idServiceResponse<team>> => {
  const [userExist, teamExists] = await Promise.all([
    prisma.user.findUnique({
      where: { email: emailUser },
    }),
    prisma.team.findUnique({
      where: { id: idTeam },
      include: { members: true, owner: true },
    }),
  ]);

  if (!userExist) {
    return {
      success: false,
      message: "El usuario que intentas agregar a este team no existe",
    };
  }

  if (!teamExists) {
    return { success: false, message: "team does not exists" };
  }

  teamExists.members.push(teamExists.owner);
  const isMember = teamExists.members.some(
    (member) => member.id === userExist.id
  );
  if (isMember) {
    return {
      success: false,
      message: "Este usuario ya se encuentra en el team",
    };
  }
  await prisma.team.update({
    where: { id: idTeam },
    data: {
      members: {
        connect: { id: userExist.id },
      },
    },
  });
  return { success: true, message: "Usuario agregado" };
};

export const deleteMember = async (
  idUser: string,
  idTeam: string
): Promise<idServiceResponse<team>> => {
  const [userExist, teamExists] = await Promise.all([
    prisma.user.findUnique({ where: { id: idUser } }),
    prisma.team.findUnique({
      where: { id: idTeam },
      include: { members: true },
    }),
  ]);

  if (!userExist) {
    return {
      success: false,
      message: "the user you are trying to delete does not exists",
    };
  }

  if (!teamExists) {
    return { success: false, message: "team does not exist" };
  }

  const updatedMembers = teamExists?.members.filter((m) => m.id !== idUser);

  const deleteMember = await prisma.team.update({
    where: { id: idTeam },
    data: {
      members: {
        set: updatedMembers?.map((member) => ({ id: member.id })),
      },
    },
  });
  return { success: true, response: deleteMember, message: "user deleted" };
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
