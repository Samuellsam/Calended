import moment, { Moment } from "moment";
import {
  HOLIDAY_DATE_FORMAT,
  getHolidaysByDate,
  isHoliday,
} from "./HolidayService";
import { WfhTeamEnum, getNextWfhTeam } from "@/enums/WfhTeamEnum";
import { DayModel } from "@/components/Calendar";
import { firstDayOfMonth, lastDayOfMonth } from "@/util/DateUtil";
import { MonthEnum } from "@/enums/MonthEnum";

const baseWfhDate: {
  date: Moment;
  wfhTeam: WfhTeamEnum;
} = {
  date: moment("02-01-2023", HOLIDAY_DATE_FORMAT),
  wfhTeam: WfhTeamEnum.C,
};

export const getMonthCalendar = (month: MonthEnum, year: number) => {
  let allDayModel: DayModel[] = [];

  let currDate: Moment = firstDayOfMonth(month, year);
  let currWfh: WfhTeamEnum = baseWfhDate.wfhTeam;

  while (currDate.isBefore(lastDayOfMonth(month, year))) {
    let currDayModel: DayModel = {
      date: moment(currDate),
      holidays: getHolidaysByDate(currDate),
      wfhTeam: undefined,
    };

    if (currDate.isSame(moment(baseWfhDate.date)))
      currDayModel.wfhTeam = currWfh;
    else if (
      currDate.isAfter(moment(baseWfhDate.date)) &&
      // kalo bukan holiday
      (!currDayModel.holidays || currDayModel.holidays.length == 0) &&
      // kalo bukan sabtu
      currDate.isoWeekday() != 6 &&
      // kalo bukan minggu
      currDate.isoWeekday() != 7 &&
      // kalo sebelum base date
      !currDate.isBefore(baseWfhDate.date)
    ) {
      currWfh = getNextWfhTeam(currWfh) as WfhTeamEnum;
      currDayModel.wfhTeam = currWfh;
    }

    allDayModel.push(currDayModel);

    currDate.add(1, "days");
  }

  return allDayModel.filter((day) =>
    day.date.isSameOrAfter(firstDayOfMonth(month, year))
  );
};
