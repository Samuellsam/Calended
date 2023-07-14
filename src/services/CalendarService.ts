import moment, { Moment } from "moment";
import {
  HOLIDAY_DATE_FORMAT,
  getHolidaysByDate,
  isHoliday,
  isHolidayCheck,
} from "./HolidayService";
import { WfhTeamEnum, getNextWfhTeam } from "@/enums/WfhTeamEnum";
import { DayModel } from "@/components/Calendar";
import {
  firstDayOfMonth,
  firstDayOfYear,
  getMonthLastWorkDay,
  lastDayOfMonth,
  lastDayOfYear,
  todayYear,
} from "@/util/DateUtil";
import { MonthEnum } from "@/enums/MonthEnum";
import { MonthlyDayModel } from "@/interfaces/MonthlyDayModel";
import { BaseWfhDateModel } from "@/interfaces/BaseWfhDateModel";

let yearlyDayModel: DayModel[] = [];
let monthlyDayModel: MonthlyDayModel = {};
import { Holiday } from "@/interfaces/Holiday";

const baseWfhDate: BaseWfhDateModel = {
  date: moment("02-01-2023", HOLIDAY_DATE_FORMAT),
  wfhTeam: WfhTeamEnum.C,
};

export const initialize = async () => {
  await initializeFullYear();
  initializeMonth();
  // initializeFullYear().then( () => {
  //   initializeMonth();
  // });
};

export const initializeMonth = () => {
  const year = todayYear();

  Object.values(MonthEnum).forEach((month) => {
    // console.log(month);

    // console.log(yearlyDayModel);
    // console.info((yearlyDayModel.length));
    // yearlyDayModel.map((day) => console.log(day));

    // console.log(yearlyDayModel[0].date.format("DD-MM-YYYY"));
    // console.log(month);
    // console.log(yearlyDayModel.length);
    // console.log("test sendiri");
    // console.log(month);
    // console.log(firstDayOfMonth(month, year).format("DD-MM-YYYY"));
    // console.log(lastDayOfMonth(month, year).format("DD-MM-YYYY"));

    monthlyDayModel[month] = yearlyDayModel.filter(
      (day) =>
        day.date.isSameOrAfter(firstDayOfMonth(month, year)) &&
        day.date.isBefore(lastDayOfMonth(month, year))
    );
  });
};

export const initializeFullYear = async () => {
  if (yearlyDayModel.length != 0) return yearlyDayModel;
  const year = todayYear();

  // before base date
  let currDate: Moment       = firstDayOfYear(year);
  let holidayList: Holiday[] = await getHolidaysByDate();
  // let holidayList: any[] = [];
  // getHolidaysByDate().then((data) =>  {
  //   holidayList = data;
  //   console.log("hello");
  //   console.log(data);
  //   return holidayList;
  // });
  // console.log("holiday:");
  // console.log(holidayList);

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

  // same or after base date
  // currDate = moment(baseWfhDate.date);
  let currWfh: WfhTeamEnum = baseWfhDate.wfhTeam;
  
  while (currDate.isBefore(getMonthLastWorkDay(lastDayOfYear(year)))) {
    let holidayName = isHolidayCheck(currDate, holidayList);
    let currDayModel: DayModel = {
      date    : moment(currDate),
      holidays: (holidayName.length > 0) ? holidayName[0].name: undefined,
      wfhTeam : undefined,
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
    // console.log(currDate.format("DD-MM-YYYY"));
  }
};

export const getMonthCalendar = async (month: MonthEnum, year: number) => {
  if (yearlyDayModel.length == 0) {
    await initialize();
  }

  return monthlyDayModel[month as MonthEnum];
};
