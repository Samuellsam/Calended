import { Holiday } from "@/interfaces/Holiday";
import { Moment } from "moment";
import {
  isDateInMonth,
  isDateSame,
  isToday,
  today,
  todayMonth,
} from "@/util/DateUtil";
import { MonthEnum } from "@/enums/MonthEnum";
import WfoCover from "./WfoCover";
import { WfhTeamEnum } from "@/enums/WfhTeamEnum";
import TodaySign from "./TodaySign";
import { isHoliday } from "@/services/HolidayService";

const DayView: React.FC<{
  date: Moment;
  holidays?: Holiday[];
  calendarMonth: MonthEnum;
  wfhTeam?: WfhTeamEnum;
}> = (props) => {
  const generateWfoTeam = () => {
    if (isHoliday(props.date) || !props.wfhTeam) return <></>;

    return <WfoCover wfhTeam={props.wfhTeam} />;
  };

  const generateDayViewClassName = () => {
    let defaultClass =
      "day-view relative rounded-lg hover:transition-all duration-150 cursor-pointer";

    if (isHoliday(props.date))
      return (
        defaultClass +
        " bg-gradient-to-r from-red-400 to-red-800 text-slate-100 border-dashed border-2 border-slate-50"
      );

    // if (isToday(props.date))
    //   return defaultClass + " bg-slate-100 text-slate-950";

    if (isDateInMonth(props.date, props.calendarMonth)) {
      if (props.wfhTeam === WfhTeamEnum.A)
        return (
          defaultClass +
          " bg-gradient-to-r from-amber-100 to-amber-300 text-slate-950"
        );

      if (props.wfhTeam === WfhTeamEnum.B)
        return (
          defaultClass +
          " bg-gradient-to-r from-lime-200 to-lime-500 text-slate-950"
        );

      if (props.wfhTeam === WfhTeamEnum.C)
        return (
          defaultClass +
          " bg-gradient-to-r from-orange-300 to-orange-600 text-slate-950"
        );

      if (props.wfhTeam === WfhTeamEnum.D)
        return (
          defaultClass +
          " bg-gradient-to-r from-cyan-200 to-cyan-500 text-slate-950"
        );

      return defaultClass + " bg-sky-800 text-sky-400 hover:bg-sky-200";
    }

    return defaultClass + " bg-sky-950 text-sky-300 hover:bg-sky-800";
  };

  return (
    <div className={generateDayViewClassName()}>
      {isDateSame(props.date, today()) && <TodaySign />}
      <p className="font-bold m-3">{props.date.date()}</p>
      {generateWfoTeam()}
    </div>
  );
};

export default DayView;
