import { HOLIDAY_DATA_PATH } from "@/constant/DataFile";
import { OffDay } from "@/interfaces/Holiday";
import fsPromises from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import { Response } from "../Response";
import { INTERNAL_SERVER_ERROR_MSG } from "@/interfaces/Message";
import { v4 as uuid } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === "POST") {
    let newHolidays: OffDay[] = [];

    const existingHolidays: string = await fsPromises.readFile(
      HOLIDAY_DATA_PATH,
      "utf-8"
    );

    if (existingHolidays)
      newHolidays = JSON.parse(existingHolidays) as OffDay[];

    const holiday: OffDay = {
      id: uuid(),
      name: req.body["name"],
      from: req.body["startDate"],
      to: req.body["endDate"],
      type: req.body["offDayType"],
    };

    newHolidays = newHolidays.concat(holiday);

    try {
      await fsPromises.writeFile(
        HOLIDAY_DATA_PATH,
        JSON.stringify(newHolidays)
      );

      res
        .status(200)
        .json({ data: null, message: "Holiday stored successfully" });
    } catch (error) {
      res.status(500).json({ data: null, message: INTERNAL_SERVER_ERROR_MSG });
    }
  }
}
