import moment, { Moment } from "moment";
import { getHolidaysByDate } from "./HolidayService";
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
import { getBaseDate } from "./BaseDateService";
import { getNextWfhTeam, getTeamById } from "./TeamService";
import { Team } from "@/interfaces/Team";
import { BaseDate } from "@/interfaces/BaseDateModel.js";
import axios from "axios";

let yearlyDayModel: DayModel[] = [];
let monthlyDayModel: MonthlyDayModel = {};

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

export const initializeFullYear = async () => {
  const response = await axios.get("/api/team/get-all");
  const teams: Team[] = response.data.data.teams;

  const baseWfhDate: BaseDate = await getBaseDate();
  const baseDateTeam = getTeamById(teams, baseWfhDate.wfhTeamId);

  if (baseDateTeam === undefined) return;

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
  let currWfh: Team = baseDateTeam;

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
      currWfh = getNextWfhTeam(teams, currWfh) as Team;
      currDayModel.wfhTeam = currWfh;
    }

    yearlyDayModel.push(currDayModel);

    currDate.add(1, "days");
  }
};

export const getMonthCalendar = async (
  month: MonthEnum,
  year: number,
  forceInit: boolean
) => {
  if (yearlyDayModel.length == 0 || forceInit == true) {
    await initializeFullYear();
    initializeMonth();
  }
  return monthlyDayModel[month as MonthEnum];
};
