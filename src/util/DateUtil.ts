import { MonthEnum } from "@/enums/MonthEnum.js";
import moment, { Moment } from "moment";

export const today = () => moment();

export const todayMonth = () => moment().get("month");

export const firstDayOfMonth = (month: MonthEnum, year: number) =>
  moment(moment(`${month + 1} ${year}`, "MM YYYY").startOf("months")).startOf(
    "weeks"
  );

export const lastDayOfMonth = (month: MonthEnum, year: number) =>
  moment(moment(`${month + 1} ${year}`, "MM YYYY").endOf("months")).endOf(
    "weeks"
  );

export const isDateSameOrBefore = (date1: Moment, date2: Moment) =>
  date1.startOf("day").isSameOrBefore(date2.startOf("day"));

export const isDateSame = (date1: Moment, date2: Moment) =>
  date1.startOf("day").isSame(date2.startOf("day"));

export const isDateInMonth = (date: Moment, month: MonthEnum) =>
  date.get("month") === month;
