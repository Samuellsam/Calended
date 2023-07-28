import { HOLIDAY_DATA_PATH } from "@/constant/DataFile";
import { OffDay } from "@/interfaces/Holiday";
import fsPromises from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import { Response } from "../Response";
import { INTERNAL_SERVER_ERROR_MSG } from "@/interfaces/Message";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === "GET") {
    let holidays: OffDay[] = [];

    const existingHolidays: string = await fsPromises.readFile(
      HOLIDAY_DATA_PATH,
      "utf-8"
    );

    if (existingHolidays) holidays = JSON.parse(existingHolidays);

    try {
      res.status(200).json({ data: { holidays }, message: "" });
    } catch (error) {
      res.status(500).json({ data: null, message: INTERNAL_SERVER_ERROR_MSG });
    }
  }
}
