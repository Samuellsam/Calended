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

const Calendar: React.FC<{}> = () => {
  const [month, setMonth] = useState<MonthEnum>(todayMonth());
  const [year, setYear] = useState<number>(todayYear());

  const generateCalendarItem = () => {
    const dayCalendarItem = [];

    const currDate: Moment = firstDayOfMonth(month, year);
    const endDate: Moment = lastDayOfMonth(month, year);

    while (currDate.isSameOrBefore(endDate)) {
      dayCalendarItem.push(
        <DayView
          key={currDate.toString()}
          date={moment(currDate)}
          holidays={getHolidaysByDate(currDate)}
          calendarMonth={month}
          wfhTeam={getWfhTeamByDate(currDate)}
        />
      );
      currDate.add(1, "days");
    }

    return (
      <div className="day-view-container flex flex-row flex-wrap justify-start mx-auto">
        {dayCalendarItem}
      </div>
    );
  };

  const generateCalendarHeader = () => {
    return (
      <div className="day-view-container flex flex-row flex-wrap justify-start mx-auto">
        {Object.values(DayHeaderEnum).map((header) => (
          <div
            className="day-view-header text-slate-50 font-bold flex"
            key={header}
          >
            <p className="my-auto ml-1">{header}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {generateCalendarHeader()}
      {generateCalendarItem()}
    </>
  );
};

export default Calendar;
