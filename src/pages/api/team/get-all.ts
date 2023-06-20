import { TEAM_DATA_PATH } from "@/constant/DataFile";
import { Team } from "@/interfaces/Team";
import fsPromises from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import { Response } from "../Response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    let teams: Team[] = [];

    const existingTeams: string = await fsPromises.readFile(
      TEAM_DATA_PATH,
      "utf-8"
    );

    if (existingTeams) teams = JSON.parse(existingTeams);

    try {
      res.status(200).json({ data: { teams: teams } } as Response);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" } as Response);
    }
  }
}
