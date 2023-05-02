export enum WfhTeamEnum {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
}

export const getWfoTeam = (wfhTeam: WfhTeamEnum) => {
  let wfo = "";

  Object.values(WfhTeamEnum).forEach((element) => {
    if (element != wfhTeam) wfo += element;
  });

  return wfo;
};
