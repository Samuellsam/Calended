import { BASE_DATE_DATA_PATH, TEAM_DATA_PATH } from "@/constant/DataFile";
import fsPromises from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import { Response } from "../Response";
import { INTERNAL_SERVER_ERROR_MSG } from "@/interfaces/Message";
import { BaseDate } from "@/interfaces/BaseDateModel.js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === "GET") {
    let baseDate: BaseDate[] = [];

    const existingBaseDate: string = await fsPromises.readFile(
      BASE_DATE_DATA_PATH,
      "utf-8"
    );

    if (existingBaseDate) baseDate = JSON.parse(existingBaseDate);

    try {
      res.status(200).json({ data: { baseDate }, message: "" });
    } catch (error) {
      res.status(500).json({ data: null, message: INTERNAL_SERVER_ERROR_MSG });
    }
  }
}
