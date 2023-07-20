import { Team } from "@/interfaces/Team";

export const Teams: Team[] = [];

export const getWfoTeam = (wfhTeam: Team) => {
  let wfo = "";

  let currWfhTeam: Team | undefined = wfhTeam;

  if (!currWfhTeam) return "";

  do {
    currWfhTeam = getNextWfhTeam(currWfhTeam);

    if (!currWfhTeam) return "";

    wfo += currWfhTeam.name;
  } while (wfo.length < Teams.length - 1);

  return wfo;
};

export const getNextWfhTeam = (wfhTeam: Team) => {
  if (wfhTeam.order == Teams.length) {
    const firstTeam = getTeamByOrder(1);

    if (!firstTeam) return undefined;

    return firstTeam;
  }

  const nextWfhTeam = Teams.find((team) => team.order == wfhTeam.order + 1);

  if (!nextWfhTeam) return undefined;

  return nextWfhTeam;
};

export const getTeamByOrder = (order: number) => {
  return Teams.find((team) => team.order == order);
};

export const getTeamByName = (name: string) => {
  return Teams.find((team) => team.name == name);
};
