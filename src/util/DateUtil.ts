import { MonthEnum } from "@/enums/MonthEnum.js";
import moment, { Moment } from "moment";

export const today = () => moment();

export const todayMonth = () => moment().get("month");

export const todayYear = () => moment().get("year");

export const isToday = (date: Moment) =>
  date.startOf("day").isSame(moment().startOf("day"));

export const firstDayOfMonth = (mont: MonthEnum, year: number) =>
  {
    let month = parseInt(mont);
    return moment(moment(`${month + 1} ${year}`, "MM YYYY").startOf("months")).startOf("weeks")
  };

export const lastDayOfMonth = (mont: MonthEnum, year: number) =>
{
  let month = parseInt(mont);
  return moment(moment(`${month + 1} ${year}`, "MM YYYY").endOf("months")).endOf(
    "weeks"
  );
}

export const isDateSameOrBefore = (date1: Moment, date2: Moment) =>
  date1.startOf("day").isSameOrBefore(date2.startOf("day"));

export const isDateSame = (date1: Moment, date2: Moment) =>
  date1.startOf("day").isSame(date2.startOf("day"));

export const isDateInMonth = (date: Moment, mont: MonthEnum) => { 
  let month = parseInt(mont);
  return date.get("month") === month;
}