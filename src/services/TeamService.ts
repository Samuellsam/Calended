import { Team } from "@/interfaces/Team";
import axios from "axios";

// export const Teams: Team[] = [
//   {
//     name: "A",
//     member: [],
//     order: 1,
//     color: "#FDE68A",
//   },
//   {
//     name: "B",
//     member: [],
//     order: 2,
//     color: "#BEF264",
//   },
//   {
//     name: "C",
//     member: [],
//     order: 3,
//     color: "#F97316",
//   },
//   {
//     name: "D",
//     member: [],
//     order: 4,
//     color: "#67E8F9",
//   },
// ];

export const getWfoTeam = async (wfhTeam: Team) => {
  const response = await axios.get("/api/team/get-all");
  const teams: Team[] = response.data.data.teams;

  let wfo = "";

  let currWfhTeam: Team | undefined = wfhTeam;

  if (!currWfhTeam) return "";

  do {
    currWfhTeam = await getNextWfhTeam(currWfhTeam);

    if (!currWfhTeam) return "";

    wfo += currWfhTeam.name;
  } while (wfo.length < teams.length - 1);

  return wfo;
};

export const getNextWfhTeam = async (wfhTeam: Team) => {
  const response = await axios.get("/api/team/get-all");
  const teams: Team[] = response.data.data.teams;

  if (wfhTeam === undefined) return;

  if (wfhTeam.order == teams.length - 1) {
    const firstTeam = await getTeamByOrder(0);

    if (!firstTeam) return undefined;

    return firstTeam;
  }

  const nextWfhTeam = teams.find((team) => team.order == wfhTeam.order + 1);

  if (!nextWfhTeam) return undefined;

  return nextWfhTeam;
};

export const getTeamByOrder = async (order: number) => {
  const response = await axios.get("/api/team/get-all");
  const teams: Team[] = response.data.data.teams;

  return teams.find((team) => team.order == order);
};

export const getTeamByName = async (name: string) => {
  const response = await axios.get("/api/team/get-all");
  const teams: Team[] = response.data.data.teams;

  return teams.find((team) => team.name == name);
};

export const getTeamById = async (id: string) => {
  const getTeamResponse = await axios.get("/api/team/get-all");
  return getTeamResponse.data.data.teams.find((t: Team) => t.id === id);
};
