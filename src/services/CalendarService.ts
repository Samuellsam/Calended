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

  // before base date
  let currDate: Moment = firstDayOfMonth(month, year);

  while (currDate.isBefore(moment(baseWfhDate.date))) {
    allDayModel.push({
      date: moment(currDate),
      holidays: getHolidaysByDate(currDate),
      wfhTeam: undefined,
    });

    currDate.add(1, "days");
  }

  // same or after base date
  currDate = moment(baseWfhDate.date);
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
      (!currDayModel.holidays || currDayModel.holidays.length == 0) &&
      currDate.isoWeekday() != 6 &&
      currDate.isoWeekday() != 7 &&
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
