import { prisma } from "../config/prisma-client";
import { Team } from "../models/team";

export const createTeam = async (data: Team) => {
  const newTeam = await prisma.team.create({ data });
  return newTeam;
};

export const addMemberToTeam = async (idUser: string, idTeam: string) => {
  const teamWithMember = await prisma.team.update({
    where: { id: idTeam },
    data: {
      integrantes: {
        connect: { id: idUser },
      },
    },
    include: {
      integrantes: {
        select: {
          nombre: true,
          email: true,
          id: true,
        },
      },
      tasks: true,
    },
  });
  return teamWithMember;
};
