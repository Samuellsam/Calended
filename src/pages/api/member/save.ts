import { TEAM_DATA_PATH } from "@/constant/DataFile";
import { Member, Team } from "@/interfaces/Team";
import fsPromises from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import { Response } from "../Response";
import { v4 as uuid } from "uuid";
import moment from "moment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let newTeams: Team[] = [];

    const existingTeams: string = await fsPromises.readFile(
      TEAM_DATA_PATH,
      "utf-8"
    );

    const member: Member = {
      id: uuid(),
      name: req.body["name"],
      birthday: req.body["birthday"],
    };

    if (member.name == null || member.name == "") {
      return res
        .status(400)
        .json({ message: "Member name cant be null" } as Response);
    }
    if (member.birthday == null) {
      return res
        .status(400)
        .json({ message: "Member birthday cant be null" } as Response);
    }

    if (existingTeams) {
      newTeams = JSON.parse(existingTeams) as Team[];
      const teamIdx = newTeams.findIndex((t) => t.id == req.body["teamId"]);
      const newTeam = newTeams[teamIdx];
      newTeam.member?.push(member);
      newTeams[teamIdx] = newTeam;
    }

    try {
      await fsPromises.writeFile(TEAM_DATA_PATH, JSON.stringify(newTeams));

      res
        .status(200)
        .json({ message: "Member stored successfully" } as Response);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" } as Response);
    }
  }
}
