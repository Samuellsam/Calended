import { todayMonth, todayYear } from "@/util/DateUtil";
import { useState } from "react";
import MonthView from "./month-view/MonthView";
import { MonthEnum } from "@/enums/MonthEnum";

const Calendar: React.FC<{}> = () => {
  const [year, setYear] = useState<number>(todayYear());

  const generateYearlyCalendar = () => {
    return Object.values(MonthEnum).map((month) => {
      return <MonthView month={month} year={year} key={month} />;
    });
  };

  return <>{generateYearlyCalendar()}</>;
};

export default Calendar;
