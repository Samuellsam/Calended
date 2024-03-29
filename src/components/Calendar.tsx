import { todayMonth, todayYear } from "@/util/DateUtil";
import { useEffect, useState } from "react";
import MonthView from "./month-view/MonthView";
import { MonthEnum } from "@/enums/MonthEnum";
import { CalendarViewEnum } from "@/enums/CalendarViewEnum";
import { OffDay } from "@/interfaces/Holiday";
import { Moment } from "moment";
import { Team } from "@/interfaces/Team";

export interface DayModel {
  date: Moment;
  wfhTeam?: Team | undefined;
  holidays?: OffDay[];
}

const Calendar: React.FC<{
  calendarView: CalendarViewEnum;
  syncCount: number;
}> = (props) => {
  const [month, setMonth] = useState<MonthEnum>(todayMonth());
  const [year, setYear] = useState<number>(todayYear());

  const yearlyCalendar = () => {
    return Object.values(MonthEnum).map((month) => {
      return (
        <MonthView
          month={month}
          year={year}
          key={props.syncCount + month}
          syncCount={props.syncCount}
        />
      );
    });
  };

  const monthlyCalendar = () => {
    return (
      <MonthView
        month={month}
        year={year}
        key={props.syncCount + month}
        syncCount={props.syncCount}
      />
    );
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
