import { getWfhTeamByDate } from "@/services/CalendarService";
import { getHolidaysByDate } from "@/services/HolidayService";
import { firstDayOfMonth, lastDayOfMonth } from "@/util/DateUtil";
import moment, { Moment } from "moment";
import DayView from "../day-view/DayView";
import { DayHeaderEnum } from "@/enums/DayHeaderEnum";
import { MonthEnum } from "@/enums/MonthEnum";
import { getMonthEnumKeyByValue } from "@/util/EnumUtil";

const MonthView: React.FC<{
  year: number;
  month: MonthEnum;
}> = (props) => {
  const generateDayCalendarItem = (month: string, year: number) => {
    const dayCalendarItem = [];

    const currDate: Moment = firstDayOfMonth(month as MonthEnum, year);
    const endDate: Moment = lastDayOfMonth(month as MonthEnum, year);

    while (currDate.isSameOrBefore(endDate)) {
      dayCalendarItem.push(
        <DayView
          key={currDate.toString()}
          date={moment(currDate)}
          holidays={getHolidaysByDate(currDate)}
          month={month as MonthEnum}
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

  const generateHeader = () => {
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
    <div className="my-2 no-select">
      <div className="day-view-container flex flex-row justify-start mx-auto">
        <h1 className="fontgw text-transparent font-bold text-2xl bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... flex flex-row justify-start">
          {getMonthEnumKeyByValue(props.month)}
        </h1>
      </div>
      <div className="day-view-container flex flex-row flex-wrap justify-start mx-auto">
        {generateHeader()}
      </div>
      <div className="day-view-container flex flex-row flex-wrap justify-start mx-auto">
        {generateDayCalendarItem(props.month, props.year)}
      </div>
    </div>
  );
};

export default MonthView;
