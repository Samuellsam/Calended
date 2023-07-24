import { TEAM_DATA_PATH } from "@/constant/DataFile";
import { Member, MemberViewModel, Team } from "@/interfaces/Team";
import fsPromises from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import { Response } from "../Response";
import moment from "moment";
import { INTERNAL_SERVER_ERROR_MSG } from "@/interfaces/Message";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === "GET") {
    let teams: Team[] = [];
    let members: MemberViewModel[] = [];

    const existingTeams: string = await fsPromises.readFile(
      TEAM_DATA_PATH,
      "utf-8"
    );

    if (existingTeams) {
      teams = JSON.parse(existingTeams);
      teams.forEach((team) => {
        if (team.member)
          team.member.forEach((member) =>
            members.push({
              id: member.id,
              name: member.name,
              birthday: member.birthday,
              teamColor: team.color,
              teamName: team.name,
            } as MemberViewModel)
          );
      });
    }

    try {
      res.status(200).json({ data: { members }, message: "" });
    } catch (error) {
      res.status(500).json({ data: null, message: INTERNAL_SERVER_ERROR_MSG });
    }
  }
}
