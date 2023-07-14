import { MonthEnum } from "@/enums/MonthEnum.js";
import moment, { Moment } from "moment";

export const today = () => moment();

export const todayMonth = () => moment().get("month").toString() as MonthEnum;

export const todayYear = () => moment().get("year");

export const isToday = (date: Moment) =>
  date.startOf("day").isSame(moment().startOf("day"));

export const firstDayOfMonth = (mont: MonthEnum, year: number) => {
  let month = parseInt(mont);
  return moment(
    moment(`${month + 1} ${year}`, "MM YYYY").startOf("months")
  ).startOf("weeks");
};

export const lastDayOfMonth = (mont: MonthEnum, year: number) => {
  let month = parseInt(mont);
  return moment(
    moment(`${month + 1} ${year}`, "MM YYYY").endOf("months")
  ).endOf("weeks");
};

export const firstDayOfYear = (year: number) => {
  return moment(moment(`01 ${year}`, "MM YYYY").startOf("months")).startOf(
    "weeks"
  );
};

export const lastDayOfYear = (year: number) => {
  return moment(moment(`12 ${year}`, "MM YYYY").endOf("months")).endOf("weeks");
};

export const isDateSameOrBefore = (date1: Moment, date2: Moment) =>
  date1.startOf("day").isSameOrBefore(date2.startOf("day"));

export const isDateSame = (date1: Moment, date2: Moment) =>
  date1.startOf("day").isSame(date2.startOf("day"));

export const isDateInMonth = (date: Moment, mont: MonthEnum) => {
  let month = parseInt(mont);
  return date.get("month") === month;
};

export const getMonthLastWorkDay = (date: Moment) => {
  let workday = moment(date).endOf("months");
  let day     = workday.day();
  let diff    = 0;              // returns yesterday
  if (day == 7){  // is Sunday or Monday
    diff = diff + 1;  // returns Friday
  }
  else if (day == 0){
    diff = diff + 2;
  }
  return workday.subtract(diff, 'days');
}
