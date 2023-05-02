export enum WfhTeamEnum {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
}

export const getWfoTeam = (wfhTeam: WfhTeamEnum) => {
  let wfo = "";

  let step = Object.values(WfhTeamEnum).indexOf(wfhTeam);

  if (step + 1 > 3) step = 0;

  let size = Object.values(WfhTeamEnum).length;

  for (let i = 0; i < size; i++, step++) {
    if (Object.values(WfhTeamEnum)[step] === wfhTeam) continue;

    if (step >= size) step = 0;
    wfo += Object.values(WfhTeamEnum)[step];
  }

  return wfo;
};
