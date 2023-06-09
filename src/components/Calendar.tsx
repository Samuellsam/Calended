import { todayYear } from "@/util/DateUtil";
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

  // return (
  //   <MonthView month={MonthEnum.JANUARY} year={year} key={MonthEnum.JANUARY} />
  // );
  return <>{generateYearlyCalendar()}</>;
};

export default Calendar;
