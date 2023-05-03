export enum WfhTeamEnum {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
}

export const getWfoTeam = (wfhTeam: WfhTeamEnum) => {
  let wfo = "";
  let currWfhTeam = wfhTeam;

  do {
    currWfhTeam = getNextWfhTeam(currWfhTeam) as WfhTeamEnum;
    wfo += currWfhTeam;
  } while (wfo.length < Object.values(WfhTeamEnum).length - 1);

  return wfo;
};

export const getNextWfhTeam = (wfhTeam: WfhTeamEnum) => {
  if (wfhTeam === WfhTeamEnum.A) return WfhTeamEnum.B;
  if (wfhTeam === WfhTeamEnum.B) return WfhTeamEnum.C;
  if (wfhTeam === WfhTeamEnum.C) return WfhTeamEnum.D;
  if (wfhTeam === WfhTeamEnum.D) return WfhTeamEnum.A;

  return undefined;
};
