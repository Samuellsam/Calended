import { Holiday } from "@/interfaces/Holiday";
import HolidayBanner from "./HolidayBanner";
import moment, { Moment } from "moment";
import { isDateInMonth, isDateSame, todayMonth } from "@/util/DateUtil";
import { MonthEnum } from "@/enums/MonthEnum";

const DayCalendarView: React.FC<{
  date: Moment;
  holidays?: Holiday[];
  calendarMonth: MonthEnum;
}> = (props) => {
  const generateHoliday = () => {
    return (
      <>
        {props.holidays &&
          props.holidays.map((h, idx) => (
            <HolidayBanner holiday={h} key={idx} />
          ))}
      </>
    );
  };

  const generateDayViewClassName = () => {
    let defaultClass =
      "day-view rounded-lg hover:transition-all duration-150 cursor-pointer";

    if (props.holidays && props.holidays.length > 1) {
      return defaultClass + " bg-red-300 text-red-700 hover:bg-red-200";
    }

    if (isDateSame(props.date, moment())) {
      return defaultClass + " bg-slate-100 text-slate-950 hover:bg-slate-100";
    }

    if (isDateInMonth(props.date, props.calendarMonth)) {
      return defaultClass + " bg-sky-300 text-sky-950 hover:bg-sky-200";
    }

    return defaultClass + " bg-sky-950 text-sky-300 hover:bg-sky-800";
  };

  return (
    <div className={generateDayViewClassName()}>
      <p className="font-bold w-min text-center m-3">{props.date.date()}</p>
      {generateHoliday()}
    </div>
  );
};

export default DayCalendarView;
