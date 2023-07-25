import { TEAM_DATA_PATH } from "@/constant/DataFile";
import { Member, MemberViewModel, Team } from "@/interfaces/Team";
import fsPromises from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import moment from "moment";
import { INTERNAL_SERVER_ERROR_MSG } from "@/interfaces/Message";
import { Response } from "../../Response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === "GET") {
    // const baseWfhDate = getBaseWfhDate();

    // if (yearlyDayModel.length != 0) return yearlyDayModel;
    // const year = todayYear();

    // // before base date
    // let currDate: Moment = firstDayOfYear(year);

    // while (currDate.isBefore(moment(baseWfhDate.date))) {
    //   if (currDate.isSameOrAfter(firstDayOfYear(year))) {
    //     yearlyDayModel.push({
    //       date: moment(currDate),
    //       holidays: getHolidaysByDate(currDate),
    //       wfhTeam: undefined,
    //     });
    //   }

    //   currDate.add(1, "days");
    // }

    // // same or after base date
    // currDate = moment(baseWfhDate.date);
    // let currWfh: Team = baseWfhDate.wfhTeam;

    // while (currDate.isBefore(lastDayOfYear(year))) {
    //   let currDayModel: DayModel = {
    //     date: moment(currDate),
    //     holidays: getHolidaysByDate(currDate),
    //     wfhTeam: undefined,
    //   };

    //   if (currDate.isSame(moment(baseWfhDate.date)))
    //     currDayModel.wfhTeam = currWfh;
    //   else if (
    //     (!currDayModel.holidays || currDayModel.holidays.length == 0) &&
    //     currDate.isoWeekday() != 6 &&
    //     currDate.isoWeekday() != 7 &&
    //     !currDate.isBefore(baseWfhDate.date)
    //   ) {
    //     currWfh = getNextWfhTeam(currWfh) as Team;

    //     currDayModel.wfhTeam = currWfh;
    //   }

    //   yearlyDayModel.push(currDayModel);

    //   currDate.add(1, "days");
    // }

    try {
      //   res.status(200).json({ data: { members }, message: "" });
    } catch (error) {
      res.status(500).json({ data: null, message: INTERNAL_SERVER_ERROR_MSG });
    }
  }
}
