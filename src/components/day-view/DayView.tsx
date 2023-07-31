import { OffDay } from "@/interfaces/Holiday";
import { Moment } from "moment";
import { isDateInMonth, isDateSame, today } from "@/util/DateUtil";
import { MonthEnum } from "@/enums/MonthEnum";
import WfoCover from "./WfoCover";
import TodaySign from "./TodaySign";
import { Team } from "@/interfaces/Team";
import { useEffect, useState } from "react";
import { getHolidays, isHoliday } from "@/services/HolidayService";

const DayView: React.FC<{
  date: Moment;
  holidays?: OffDay[];
  month: MonthEnum;
  wfhTeam?: Team;
}> = (props) => {
  const [isWorkday, setIsWorkday] = useState(false);
  const [isOffDay, setIsOffDay] = useState(false);

  useEffect(() => {
    setIsWorkday(
      isDateInMonth(props.date, props.month) && props.wfhTeam !== undefined
    );
    fetchIsHoliday();
  }, [props.wfhTeam]);

  const fetchIsHoliday = async () => {
    setIsOffDay(isHoliday(await getHolidays(), props.date));
  };

  const generateDayViewClassName = () => {
    let defaultClass =
      "day-view relative rounded-lg hover:transition-all duration-150 cursor-pointer";

    if (isDateInMonth(props.date, props.month)) {
      if (isOffDay) return defaultClass + " bg-red-700 text-slate-100";

      if (props.wfhTeam) {
        return defaultClass + ` text-slate-950`;
      }

      return defaultClass + " bg-sky-800 text-sky-400 hover:bg-sky-200";
    }

    if (isOffDay)
      return defaultClass + " bg-red-950 text-red-300 hover:bg-red-800";

    return defaultClass + " bg-sky-950 text-sky-300 hover:bg-sky-800";
  };

  return (
    <div
      className={generateDayViewClassName()}
      style={{
        background: isWorkday ? props.wfhTeam?.color : undefined,
      }}
    >
      {isDateSame(props.date, today()) && <TodaySign />}
      <p className="font-bold m-3">{props.date.date()}</p>
      {!isOffDay && props.wfhTeam && <WfoCover wfhTeam={props.wfhTeam} />}
    </div>
  );
};

export default DayView;
