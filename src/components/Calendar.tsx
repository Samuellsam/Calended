import { todayMonth, todayYear } from "@/util/DateUtil";
import { useState } from "react";
import MonthView from "./month-view/MonthView";
import { MonthEnum } from "@/enums/MonthEnum";
import { CalendarViewEnum } from "@/enums/CalendarViewEnum";

const Calendar: React.FC<{
  calendarView: CalendarViewEnum;
}> = (props) => {
  const [year, setYear] = useState<number>(todayYear());

  const yearlyCalendar = () => {
    return Object.values(MonthEnum).map((month) => {
      return <MonthView month={month} year={year} key={month} />;
    });
  };

  return (
    <>
      {props.calendarView == CalendarViewEnum.MONTH_VIEW ? (
        <MonthView
          month={todayMonth() as MonthEnum}
          year={year}
          key={todayMonth()}
        />
      ) : (
        yearlyCalendar()
      )}
    </>
  );
};

export default Calendar;
