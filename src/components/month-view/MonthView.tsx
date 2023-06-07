import { getWfhTeamByDate } from "@/services/CalendarService";
import { getHolidaysByDate } from "@/services/HolidayService";
import { firstDayOfMonth, lastDayOfMonth } from "@/util/DateUtil";
import moment, { Moment } from "moment";
import DayCalendarView from "../day-view/DayView";
import { DayHeaderEnum } from "@/enums/DayHeaderEnum";
import { MonthEnum } from "@/enums/MonthEnum";

const MonthCalendarView: React.FC<{
 year: number; 
}> = (props) => {
  
  const generateDayCalendarItem = (month: string, year: number) => {
    const dayCalendarItem = [];

    // let monthE = Object.values(MonthEnum).indexOf(month as unknown as MonthEnum);
    const currDate: Moment = firstDayOfMonth(month as MonthEnum, year);
    const endDate: Moment = lastDayOfMonth(month as MonthEnum, year);

    while (currDate.isSameOrBefore(endDate)) {
      dayCalendarItem.push(
        <DayCalendarView
          key           = {currDate.toString()}
          date          = {moment(currDate)}
          holidays      = {getHolidaysByDate(currDate)}
          calendarMonth = {month as MonthEnum}
          wfhTeam       = {getWfhTeamByDate(currDate)}
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
          <div
            className="day-view-header text-slate-50 font-bold flex"
            key={header}
          >
            <p className="my-auto ml-1">{header}</p>
          </div>
        ))}
      </>
    );
  };

  // console.log(MonthEnum);
  const MonthResult = Object.keys(MonthEnum).map((item, index) => {
    
    // const monthly = generateDayCalendarItem(MonthEnum[item],props.year);
    const monthly = generateDayCalendarItem(index.toString(),props.year);
    const html = (
      <div className="my-2">
        <div className="day-view-container flex flex-row justify-start mx-auto">
          <h1 className="fontgw text-transparent font-bold text-2xl bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... flex flex-row justify-start">
            {item}
          </h1>
        </div>
        <div className="day-view-container flex flex-row flex-wrap justify-start mx-auto">
          {generateDayHeader()}
        </div>
        <div className="day-view-container flex flex-row flex-wrap justify-start mx-auto">
          {monthly}
        </div>
      </div>
    );

    return html;
  });

  return (<>{MonthResult}</>);
};

export default MonthCalendarView;