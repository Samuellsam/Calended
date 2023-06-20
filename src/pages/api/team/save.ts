import { TEAM_DATA_PATH } from "@/constant/DataFile";
import { Team } from "@/interfaces/Team";
import fsPromises from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import { Response } from "../Response";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let newTeam: Team[] = [];

    const existingTeams: string = await fsPromises.readFile(
      TEAM_DATA_PATH,
      "utf-8"
    );

    if (existingTeams) {
      newTeam = JSON.parse(existingTeams) as Team[];
    }

    const team: Team = req.body;
          team.name  = team.name?.trim().toLowerCase();

    if(team.name == null || team.name == ''){
      return res.status(401).json({ message: "Team cant be null" } as Response);
    }
    if(newTeam.filter( (t:Team) => t?.name === team.name).length > 0){
      return res.status(401).json({ message: "Team already exists" } as Response);
    }
    
    newTeam = newTeam.concat(team);

    try {
      await fsPromises.writeFile(
        TEAM_DATA_PATH,
        JSON.stringify(newTeam)
      );

      res
        .status(200)
        .json({ message: "Team stored successfully" } as Response);

    } catch (error) {
      res.status(500).json({ message: "Internal server error" } as Response);
    }
  }
}
