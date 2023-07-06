import { Team } from "@/interfaces/Team";

export const WfhTeams: Team[] = [
  {
    name: "A",
    member: [],
    order: 0,
    color: "#FDE68A",
  },
  {
    name: "B",
    member: [],
    order: 1,
    color: "#BEF264",
  },
  {
    name: "C",
    member: [],
    order: 2,
    color: "#F97316",
  },
  {
    name: "D",
    member: [],
    order: 3,
    color: "#67E8F9",
  },
];

export const getWfoTeam = (wfhTeam: Team) => {
  let wfo = "";

  let currWfhTeam: Team | undefined = wfhTeam;

  if (!currWfhTeam) return "";

  do {
    currWfhTeam = getNextWfhTeam(currWfhTeam);

    if (!currWfhTeam) return "";

    wfo += currWfhTeam.name;
  } while (wfo.length < WfhTeams.length - 1);

  return wfo;
};

export const getNextWfhTeam = (wfhTeam: Team) => {
  if (wfhTeam.order == WfhTeams.length - 1) {
    const firstTeam = getTeamByOrder(0);

    if (!firstTeam) return undefined;

    return firstTeam;
  }

  const nextWfhTeam = WfhTeams.find((team) => team.order == wfhTeam.order + 1);

  if (!nextWfhTeam) return undefined;

  return nextWfhTeam;
};

export const getTeamByOrder = (order: number) => {
  return WfhTeams.find((team) => team.order == order);
};

export const getTeamByName = (name: string) => {
  return WfhTeams.find((team) => team.name == name);
};
