import { todayMonth, todayYear } from "@/util/DateUtil";
import { useEffect, useState } from "react";
import MonthView from "./month-view/MonthView";
import { MonthEnum } from "@/enums/MonthEnum";
import { CalendarViewEnum } from "@/enums/CalendarViewEnum";
import { Holiday } from "@/interfaces/Holiday";
import { Moment } from "moment";
import { Team } from "@/interfaces/Team";

export interface DayModel {
  date: Moment;
  wfhTeam?: Team | undefined;
  holidays?: string | undefined;
}

const Calendar: React.FC<{
  calendarView: CalendarViewEnum;
}> = (props) => {
  const [month, setMonth] = useState<MonthEnum>(todayMonth());
  const [year, setYear] = useState<number>(todayYear());

  const yearlyCalendar = () => {
    return Object.values(MonthEnum).map((month) => {
      return <MonthView month={month} year={year} key={month} />;
    });
  };

  const monthlyCalendar = () => {
    return <MonthView month={month} year={year} key={month} />;
  };

  return (
    <>
      {props.calendarView == CalendarViewEnum.MONTH_VIEW
        ? monthlyCalendar()
        : yearlyCalendar()}
    </>
  );
};

export default Calendar;
