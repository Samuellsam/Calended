import { WfhTeamModel } from "@/interfaces/WfhTeamModel";

export const WfhTeams: WfhTeamModel[] = [
  {
    value: "A",
    order: 0,
    color: "amber",
  },
  {
    value: "B",
    order: 1,
    color: "lime",
  },
  {
    value: "C",
    order: 2,
    color: "orange",
  },
  {
    value: "D",
    order: 3,
    color: "cyan",
  },
];

export const getWfoTeam = (wfhTeam: WfhTeamModel) => {
  let wfo = "";

  let currWfhTeam: WfhTeamModel | undefined = wfhTeam;

  if (!currWfhTeam) return "";

  do {
    currWfhTeam = getNextWfhTeam(currWfhTeam);

    if (!currWfhTeam) return "";

    wfo += currWfhTeam.value;
  } while (wfo.length < WfhTeams.length - 1);

  return wfo;
};

export const getNextWfhTeam = (wfhTeam: WfhTeamModel) => {
  if (wfhTeam.order == WfhTeams.length - 1) {
    const firstTeam = getTeamByOrder(0);

    if (!firstTeam) return undefined;

    return firstTeam;
  }

  const nextWfhTeam = WfhTeams.find((team) => team.order == wfhTeam.order + 1);

  if (!nextWfhTeam) return undefined;

  return nextWfhTeam;
};

const getTeamByOrder = (order: number) => {
  return WfhTeams.find((team) => team.order == order);
};

const getTeamByValue = (value: string) => {
  return WfhTeams.find((team) => team.value == value);
};
