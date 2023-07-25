import { BASE_DATE_DATA_PATH, TEAM_DATA_PATH } from "@/constant/DataFile";
import { Team } from "@/interfaces/Team";
import fsPromises from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import { Response } from "../Response";
import { v4 as uuid } from "uuid";
import { INTERNAL_SERVER_ERROR_MSG } from "@/interfaces/Message";
import { BaseDate } from "@/interfaces/BaseDateModel.js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === "POST") {
    if (req.body["baseDate"] == null || req.body["baseDate"] == "") {
      return res
        .status(400)
        .json({ data: null, message: "Base date cant be null" });
    }
    if (req.body["wfhTeamId"] == null || req.body["wfhTeamId"] == "") {
      return res
        .status(400)
        .json({ data: null, message: "WFH team ID cant be null" });
    }

    let newBaseDate: BaseDate = {
      date: req.body["baseDate"],
      wfhTeamId: req.body["wfhTeamId"],
    };

    try {
      await fsPromises.writeFile(
        BASE_DATE_DATA_PATH,
        JSON.stringify(newBaseDate)
      );

      res.status(200).json({ data: null, message: "Team stored successfully" });
    } catch (error) {
      res.status(500).json({ data: null, message: INTERNAL_SERVER_ERROR_MSG });
    }
  }
}
