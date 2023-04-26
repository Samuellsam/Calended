import { Holiday } from "@/interfaces/Holiday";
import HolidayBanner from "./HolidayBanner";

const DayCalendarView: React.FC<{
  date: number;
  holidays?: Holiday[];
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
    let defaultClass = "day-view rounded-lg hover:transition-all duration-150";

    if (props.holidays && props.holidays.length > 1) {
      return defaultClass + " bg-red-300 text-red-700 hover:bg-red-200";
    }

    return defaultClass + " bg-sky-900 text-sky-500 hover:bg-sky-200";
  };

  return (
    <div className={generateDayViewClassName()}>
      <p className="font-bold w-min text-center m-3">{props.date}</p>
      {generateHoliday()}
    </div>
  );
};

export default DayCalendarView;
