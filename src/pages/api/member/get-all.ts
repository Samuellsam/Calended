import { TEAM_DATA_PATH } from "@/constant/DataFile";
import { Member, Team } from "@/interfaces/Team";
import fsPromises from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import { Response } from "../Response";
import moment from "moment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    let teams: Team[] = [];
    let members: Member[] = [];

    const existingTeams: string = await fsPromises.readFile(
      TEAM_DATA_PATH,
      "utf-8"
    );

    if (existingTeams) {
      teams = JSON.parse(existingTeams);
      teams.forEach((team) => {
        if (team.member) team.member.forEach((member) => members.push(member));
      });
    }

    try {
      res.status(200).json({ data: { members: members } } as Response);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" } as Response);
    }
  }
}
