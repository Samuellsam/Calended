import { TEAM_DATA_PATH } from "@/constant/DataFile";
import { Team } from "@/interfaces/Team";
import fsPromises from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import { Response } from "../Response";
import { INTERNAL_SERVER_ERROR_MSG } from "@/interfaces/Message";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === "GET") {
    let teams: Team[] = [];

    const existingTeams: string = await fsPromises.readFile(
      TEAM_DATA_PATH,
      "utf-8"
    );

    if (existingTeams) teams = JSON.parse(existingTeams);

    try {
      res.status(200).json({ data: { teams }, message: "" });
    } catch (error) {
      res.status(500).json({ data: null, message: INTERNAL_SERVER_ERROR_MSG });
    }
  }
}
