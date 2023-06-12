import { HOLIDAY_DATA_PATH } from "@/constant/DataFile";
import { Holiday } from "@/interfaces/Holiday";
import fsPromises from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import { Response } from "../Response";

interface SaveHolidayRequest {
  holidays: Holiday[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    let holidays: Holiday[] = [];

    const existingHolidays: string = await fsPromises.readFile(
      HOLIDAY_DATA_PATH,
      "utf-8"
    );

    if (existingHolidays) holidays = JSON.parse(existingHolidays);

    try {
      res.status(200).json({ data: { holidays: holidays } } as Response);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" } as Response);
    }
  }
}
