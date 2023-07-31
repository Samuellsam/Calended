import { CALENDED_DATE_PICKER_FORMAT } from "@/components/form/CalendedDatePicker";
import { OffDay } from "@/interfaces/Holiday";
import axios from "axios";
import moment, { Moment } from "moment";

export const HOLIDAY_DATE_FORMAT = "DD-MM-YYYY";

export const getHolidays = async () => {
  const response = await axios.get("/api/holiday/get-all");
  const holidays: OffDay[] = response.data.data.holidays;
  holidays.map((h) => {
    return {
      id: h.id,
      from: moment(h.from, CALENDED_DATE_PICKER_FORMAT),
      to: moment(h.to, CALENDED_DATE_PICKER_FORMAT),
      name: h.name,
      type: h.type,
    } as OffDay;
  });
  return holidays ?? [];
};

export const getHolidaysByDate = (holidays: OffDay[], date: Moment) => {
  return holidays.filter((holiday) =>
    date.isBetween(holiday.from, holiday.to, "days", "[]")
  );
};

export const isHoliday = (holidays: OffDay[], date: Moment) => {
  return (
    holidays.filter((holiday) =>
      date.isBetween(holiday.from, holiday.to, "days", "[]")
    ).length > 0
  );
};
