import { Team } from "@/interfaces/Team";

export const Teams: Team[] = [
  {
    name: "A",
    member: [],
    order: 1,
    color: "#FDE68A",
  },
  {
    name: "B",
    member: [],
    order: 2,
    color: "#BEF264",
  },
  {
    name: "C",
    member: [],
    order: 3,
    color: "#F97316",
  },
  {
    name: "D",
    member: [],
    order: 4,
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
