import { Holiday } from "@/interfaces/Holiday";
import { Moment } from "moment";
import { isDateInMonth, isDateSame, today } from "@/util/DateUtil";
import { MonthEnum } from "@/enums/MonthEnum";
import WfoCover from "./WfoCover";
import { WfhTeamEnum } from "@/enums/WfhTeamEnum";
import TodaySign from "./TodaySign";
import { isHoliday } from "@/services/HolidayService";

const DayView: React.FC<{
  date: Moment;
  holidays?: Holiday[];
  month: MonthEnum;
  wfhTeam?: WfhTeamEnum;
}> = (props) => {
  const generateDayViewClassName = () => {
    let defaultClass =
      "day-view relative rounded-lg hover:transition-all duration-150 cursor-pointer";

    if (isDateInMonth(props.date, props.month)) {
      if (isHoliday(props.date))
        return defaultClass + " bg-red-700 text-slate-100";

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

    if (isHoliday(props.date))
      return defaultClass + " bg-red-950 text-red-300 hover:bg-red-800";

    return defaultClass + " bg-sky-950 text-sky-300 hover:bg-sky-800";
  };

  return (
    <div className={generateDayViewClassName()}>
      {isDateSame(props.date, today()) && <TodaySign />}
      <p className="font-bold m-3">{props.date.date()}</p>
      {!isHoliday(props.date) && props.wfhTeam && (
        <WfoCover wfhTeam={props.wfhTeam} />
      )}
    </div>
  );
};

export default DayView;
