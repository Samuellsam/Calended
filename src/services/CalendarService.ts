import moment, { Moment } from "moment";
import { isHoliday } from "./HolidayService";
import { WfhTeamEnum, getNextWfhTeam } from "@/enums/WfhTeamEnum";

const baseWfhDate: {
  date: Moment;
  wfhTeam: WfhTeamEnum;
} = {
  date: moment("02-01-2023", "DD-MM-YYYY"),
  wfhTeam: WfhTeamEnum.C,
};

export const getWfhTeamByDate = (date: Moment) => {
  if (
    isHoliday(date) ||
    date.isoWeekday() == 6 ||
    date.isoWeekday() == 7 ||
    date.isBefore(baseWfhDate.date)
  )
    return undefined;

  let currDate: Moment = moment(baseWfhDate.date);
  let currWfh: WfhTeamEnum = baseWfhDate.wfhTeam;

  while (currDate.isBefore(date)) {
    if (
      !isHoliday(currDate) &&
      currDate.isoWeekday() != 6 &&
      currDate.isoWeekday() != 7
    )
      currWfh = getNextWfhTeam(currWfh) as WfhTeamEnum;

    currDate.add(1, "days");
  }

  return currWfh;
};
