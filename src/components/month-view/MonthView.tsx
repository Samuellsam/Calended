import { getMonthCalendar } from "@/services/CalendarService";
import moment, { Moment } from "moment";
import DayView from "../day-view/DayView";
import { DayHeaderEnum } from "@/enums/DayHeaderEnum";
import { MonthEnum } from "@/enums/MonthEnum";
import { getMonthEnumKeyByValue } from "@/util/EnumUtil";
import { ReactNode, useEffect, useState } from "react";
import { DayModel } from "../Calendar";
import { faL } from "@fortawesome/free-solid-svg-icons";

const MonthView: React.FC<{
  year: number;
  month: MonthEnum;
  syncCount: number;
}> = (props) => {
  const [monthCalendar, setMonthCalendar] = useState([] as DayModel[]);

  useEffect(() => {
    (async () => {
      setMonthCalendar(
        (await getMonthCalendar(props.month, props.year, false)) ?? []
      );
    })();
  }, [props.month, props.year]);

  useEffect(() => {
    (async () => {
      if (props.syncCount > 0) {
        const temp = [
          ...((await getMonthCalendar(props.month, props.year, true)) ?? []),
        ];
        setMonthCalendar(temp);
      }
    })();
  }, [props.syncCount]);

  const generateDayCalendarItem = () => {
    return (
      <div className="day-view-container flex flex-row flex-wrap justify-start mx-auto">
        {monthCalendar.map((dayModel, idx) => {
          return (
            <DayView
              key={props.syncCount + idx}
              date={moment(dayModel.date)}
              holidays={dayModel.holidays}
              month={props.month as MonthEnum}
              wfhTeam={dayModel.wfhTeam}
            />
          );
        })}
      </div>
    );
  };

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
      {generateDayCalendarItem()}
    </div>
  );
};

export default MonthView;
