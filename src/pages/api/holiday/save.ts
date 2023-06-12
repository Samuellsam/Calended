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
  if (req.method === "POST") {
    let newHolidays: Holiday[] = [];

    const existingHolidays: string = await fsPromises.readFile(
      HOLIDAY_DATA_PATH,
      "utf-8"
    );

    if (existingHolidays)
      newHolidays = JSON.parse(existingHolidays) as Holiday[];

    const { holidays }: SaveHolidayRequest = req.body;

    newHolidays = newHolidays.concat(holidays);

    try {
      await fsPromises.writeFile(
        HOLIDAY_DATA_PATH,
        JSON.stringify(newHolidays)
      );

      res
        .status(200)
        .json({ message: "Holiday stored successfully" } as Response);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" } as Response);
    }
  }
}
