import {
  firstDayOfMonth,
  lastDayOfMonth,
  todayMonth,
  todayYear,
} from "@/util/DateUtil";
import DayView from "../../components/day-view/DayView";
import moment, { Moment } from "moment";
import { MonthEnum } from "@/enums/MonthEnum";
import { useState } from "react";
import { DayHeaderEnum } from "@/enums/DayHeaderEnum";
import DayViewHeader from "../../components/day-view/DayViewHeader";
import { getHolidaysByDate } from "@/services/HolidayService";
import { getWfhTeamByDate } from "@/services/CalendarService";

const HomePage: React.FC<{}> = () => {
  const [month, setMonth] = useState<MonthEnum>(todayMonth());
  const [year, setYear] = useState<number>(todayYear());

  const generateDayCalendarItem = () => {
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

    return dayCalendarItem;
  };

  const generateDayHeader = () => {
    return (
      <>
        {Object.values(DayHeaderEnum).map((header) => (
          <DayViewHeader header={header} key={header} />
        ))}
      </>
    );
  };

  return (
    <div>
      <p className="font-caveat-700 text-slate-100 mx-auto mt-3 w-max drop-shadow-[0_20px_20px_rgba(255,255,255,1)]">
        {"Calended~"}
      </p>
      <div className="day-view-container flex flex-row flex-wrap justify-start mx-auto">
        {generateDayHeader()}
      </div>
      <div className="day-view-container flex flex-row flex-wrap justify-start mx-auto">
        {generateDayCalendarItem()}
      </div>
    </div>
  );
};

export default HomePage;
