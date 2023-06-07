import moment, { Moment } from "moment";
import {
  firstDayOfMonth,
  lastDayOfMonth,
  todayMonth,
  todayYear,
} from "@/util/DateUtil";
import { useState } from "react";
import { MonthEnum } from "@/enums/MonthEnum";
import { getHolidaysByDate } from "@/services/HolidayService";
import { getWfhTeamByDate } from "@/services/CalendarService";
import DayView from "../components/day-view/DayView";
import { DayHeaderEnum } from "@/enums/DayHeaderEnum";
import MonthCalendarView from "./month-view/MonthView";

const Calendar: React.FC<{}> = () => {
  const [year, setYear] = useState<number>(todayYear());

  return (
    <>
      <MonthCalendarView year={year} />
    </>
  );
};

export default Calendar;
