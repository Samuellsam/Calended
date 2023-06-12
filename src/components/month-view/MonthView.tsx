import { getWfhTeamByDate } from "@/services/CalendarService";
import { getHolidaysByDate } from "@/services/HolidayService";
import { firstDayOfMonth, lastDayOfMonth } from "@/util/DateUtil";
import moment, { Moment } from "moment";
import DayView from "../day-view/DayView";
import { DayHeaderEnum } from "@/enums/DayHeaderEnum";
import { MonthEnum } from "@/enums/MonthEnum";
import { getMonthEnumKeyByValue } from "@/util/EnumUtil";
import { Suspense, useMemo } from "react";

const MonthView: React.FC<{
  year: number;
  month: MonthEnum;
}> = (props) => {
  const generateDayCalendarItem = useMemo(() => {
    const dayCalendarItem = [];

    const currDate: Moment = firstDayOfMonth(
      props.month as MonthEnum,
      props.year
    );
    const endDate: Moment = lastDayOfMonth(
      props.month as MonthEnum,
      props.year
    );

    while (currDate.isSameOrBefore(endDate)) {
      dayCalendarItem.push(
        <DayView
          date={moment(currDate)}
          holidays={getHolidaysByDate(currDate)}
          month={props.month as MonthEnum}
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
  }, [props.month, props.year]);

  const generateHeader = () => {
    return (
      <div className="day-view-container flex flex-row flex-wrap justify-start mx-auto">
        {Object.values(DayHeaderEnum).map((header) => (
          <div
            className="day-view-header text-slate-50 font-bold flex border-b-4 border-solid border-slate-100"
            key={header}
          >
            <p className="my-auto ml-1">{header}</p>
          </div>
        ))}
      </div>
    );
  };

  const generateTitle = () => {
    return (
      <div className="bg-slate-800 py-1 px-4 rounded-lg">
        <h1 className="font-inter-900 month-title-size w-min text-transparent font-bold text-2xl bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto">
          {`${getMonthEnumKeyByValue(props.month)}`}
        </h1>
      </div>
    );
  };

  return (
    <div className="my-2 no-select bg-slate-700 w-min mx-auto rounded-lg p-3">
      {generateTitle()}
      {generateHeader()}
      {generateDayCalendarItem}
    </div>
  );
};

export default MonthView;
