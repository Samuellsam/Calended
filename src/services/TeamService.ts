import { Team } from "@/interfaces/Team";

export const getWfoTeam = (teams: Team[], wfhTeam: Team) => {
  let wfo = "";

  let currWfhTeam: Team | undefined = wfhTeam;

  if (!currWfhTeam) return "";

  do {
    currWfhTeam = getNextWfhTeam(teams, currWfhTeam);

    if (!currWfhTeam) return "";

    wfo += currWfhTeam.name;
  } while (wfo.length < teams.length - 1);

  return wfo;
};

export const getNextWfhTeam = (teams: Team[], wfhTeam: Team) => {
  if (wfhTeam === undefined) return;

  if (wfhTeam.order == teams.length - 1) {
    const firstTeam = getTeamByOrder(teams, 0);

    if (!firstTeam) return undefined;

    return firstTeam;
  }

  const nextWfhTeam = teams.find((team) => team.order == wfhTeam.order + 1);

  if (!nextWfhTeam) return undefined;

  return nextWfhTeam;
};

export const getTeamByOrder = (teams: Team[], order: number) => {
  return teams.find((t) => t.order == order);
};

export const getTeamByName = (teams: Team[], name: string) => {
  return teams.find((t) => t.name == name);
};

export const getTeamById = (teams: Team[], id: string) => {
  return teams.find((t: Team) => t.id === id);
};
