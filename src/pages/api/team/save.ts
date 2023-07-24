import { TEAM_DATA_PATH } from "@/constant/DataFile";
import { Team } from "@/interfaces/Team";
import fsPromises from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import { Response } from "../Response";
import { v4 as uuid } from "uuid";
import { INTERNAL_SERVER_ERROR_MSG } from "@/interfaces/Message";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === "POST") {
    if (req.body["name"] == null || req.body["name"] == "") {
      return res
        .status(400)
        .json({ data: null, message: "Team name cant be null" });
    }
    if (req.body["color"] == null || req.body["color"] == "") {
      return res
        .status(400)
        .json({ data: null, message: "Team color cant be null" });
    }

    let newTeam: Team[] = [];

    const existingTeams: string = await fsPromises.readFile(
      TEAM_DATA_PATH,
      "utf-8"
    );

    if (existingTeams) {
      newTeam = JSON.parse(existingTeams) as Team[];

      if (newTeam.filter((t: Team) => t?.name === req.body["name"]).length > 0)
        return res
          .status(400)
          .json({ data: null, message: "Team already exists" });
    }

    newTeam = newTeam.concat({
      id: uuid(),
      name: req.body["name"],
      color: req.body["color"],
      order: newTeam.length,
      member: [],
    });

    try {
      await fsPromises.writeFile(TEAM_DATA_PATH, JSON.stringify(newTeam));

      res.status(200).json({ data: null, message: "Team stored successfully" });
    } catch (error) {
      res.status(500).json({ data: null, message: INTERNAL_SERVER_ERROR_MSG });
    }
  }
}
