import moment, { Moment } from "moment";
import { getHolidaysByDate } from "./HolidayService";
import { Holiday } from "@/interfaces/Holiday";
import { WfhTeamEnum, getNextWfhTeam } from "@/enums/WfhTeamEnum";

const baseWfhDate: {
  date: Moment;
  wfhTeam: WfhTeamEnum;
} = {
  date: moment("02-01-2023", "DD MM YYYY"),
  wfhTeam: WfhTeamEnum.C,
};

export const getWfhTeamByDate = (date: Moment) => {
  const holidayInThisDate: Holiday[] = getHolidaysByDate(date);

  if (
    holidayInThisDate.length > 0 ||
    date.isoWeekday() == 6 ||
    date.isoWeekday() == 7 ||
    date.isBefore(baseWfhDate.date)
  )
    return undefined;

  let currDate: Moment = moment(baseWfhDate.date);
  let currWfh: WfhTeamEnum = baseWfhDate.wfhTeam;

  while (currDate.isBefore(date)) {
    if (
      holidayInThisDate.length == 0 &&
      currDate.isoWeekday() != 6 &&
      currDate.isoWeekday() != 7
    )
      currWfh = getNextWfhTeam(currWfh) as WfhTeamEnum;

    currDate.add(1, "days");
  }

  return currWfh;
};
