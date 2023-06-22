import moment, { Moment } from "moment";
import {
  HOLIDAY_DATE_FORMAT,
  getHolidaysByDate,
  isHoliday,
} from "./HolidayService";
import { WfhTeamEnum, getNextWfhTeam } from "@/enums/WfhTeamEnum";
import { DayModel } from "@/components/Calendar";
import {
  firstDayOfMonth,
  firstDayOfYear,
  lastDayOfMonth,
  lastDayOfYear,
  todayYear,
} from "@/util/DateUtil";
import { MonthEnum } from "@/enums/MonthEnum";
import { MonthlyDayModel } from "@/interfaces/MonthlyDayModel";
import { BaseWfhDateModel } from "@/interfaces/BaseWfhDateModel";

let yearlyDayModel: DayModel[] = [];
let monthlyDayModel: MonthlyDayModel = {};

const baseWfhDate: BaseWfhDateModel = {
  date: moment("02-01-2023", HOLIDAY_DATE_FORMAT),
  wfhTeam: WfhTeamEnum.C,
};

export const initialize = () => {
  initializeFullYear();
  initializeMonth();
};

export const initializeMonth = () => {
  const year = todayYear();

  Object.values(MonthEnum).forEach((month) => {
    monthlyDayModel[month] = yearlyDayModel.filter(
      (day) =>
        day.date.isSameOrAfter(firstDayOfMonth(month, year)) &&
        day.date.isBefore(lastDayOfMonth(month, year))
    );
  });
};

export const initializeFullYear = () => {
  if (yearlyDayModel.length != 0) return yearlyDayModel;
  const year = todayYear();

  // before base date
  let currDate: Moment = firstDayOfYear(year);

  while (currDate.isBefore(moment(baseWfhDate.date))) {
    if (currDate.isSameOrAfter(firstDayOfYear(year))) {
      yearlyDayModel.push({
        date: moment(currDate),
        holidays: getHolidaysByDate(currDate),
        wfhTeam: undefined,
      });
    }

    currDate.add(1, "days");
  }

  // same or after base date
  currDate = moment(baseWfhDate.date);
  let currWfh: WfhTeamEnum = baseWfhDate.wfhTeam;

  while (currDate.isBefore(lastDayOfYear(year))) {
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

    yearlyDayModel.push(currDayModel);

    currDate.add(1, "days");
  }
};

export const getMonthCalendar = (month: MonthEnum, year: number) => {
  if (yearlyDayModel.length == 0) {
    initialize();
  }

  return monthlyDayModel[month as MonthEnum];
};
