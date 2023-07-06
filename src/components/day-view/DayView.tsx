import { Holiday } from "@/interfaces/Holiday";
import { Moment } from "moment";
import { isDateInMonth, isDateSame, today } from "@/util/DateUtil";
import { MonthEnum } from "@/enums/MonthEnum";
import WfoCover from "./WfoCover";
import TodaySign from "./TodaySign";
import { isHoliday } from "@/services/HolidayService";
import { WfhTeamModel } from "@/enums/WfhTeamEnum";

const DayView: React.FC<{
  date: Moment;
  holidays?: Holiday[];
  month: MonthEnum;
  wfhTeam?: WfhTeamModel;
}> = (props) => {
  const generateDayViewClassName = () => {
    let defaultClass =
      "day-view relative rounded-lg hover:transition-all duration-150 cursor-pointer";

    if (isDateInMonth(props.date, props.month)) {
      if (isHoliday(props.date))
        return defaultClass + " bg-red-700 text-slate-100";

      if (props.wfhTeam)
        return (
          defaultClass +
          ` bg-gradient-to-r from-${props.wfhTeam.color}-100 to-${props.wfhTeam.color}-300 text-slate-950`
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
