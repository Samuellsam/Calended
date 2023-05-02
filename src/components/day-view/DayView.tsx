import { Holiday } from "@/interfaces/Holiday";
import HolidayBanner from "./HolidayBanner";
import moment, { Moment } from "moment";
import { isDateInMonth, isDateSame, todayMonth } from "@/util/DateUtil";
import { MonthEnum } from "@/enums/MonthEnum";
import WfoCover from "./WfhCover";
import { WfhTeamEnum } from "@/enums/WfhTeamEnum";

const DayCalendarView: React.FC<{
  date: Moment;
  holidays?: Holiday[];
  calendarMonth: MonthEnum;
  wfhTeam?: WfhTeamEnum;
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

  const generateWfoTeam = () => {
    return <>{props.wfhTeam && <WfoCover wfhTeam={props.wfhTeam} />}</>;
  };

  const generateDayViewClassName = () => {
    let defaultClass =
      "day-view relative rounded-lg hover:transition-all duration-150 cursor-pointer";

    if (props.holidays && props.holidays.length > 1)
      return defaultClass + " bg-red-300 text-red-700 hover:bg-red-200";

    if (isDateSame(props.date, moment()))
      return defaultClass + " bg-slate-100 text-slate-950 hover:bg-slate-100";

    if (isDateInMonth(props.date, props.calendarMonth)) {
      if (props.wfhTeam === WfhTeamEnum.A)
        return defaultClass + " bg-amber-300 text-slate-950";
      if (props.wfhTeam === WfhTeamEnum.B)
        return defaultClass + " bg-lime-300 text-slate-950";
      if (props.wfhTeam === WfhTeamEnum.C)
        return defaultClass + " bg-orange-300 text-slate-950";
      if (props.wfhTeam === WfhTeamEnum.D)
        return defaultClass + " bg-violet-300 text-slate-950";

      return defaultClass + " bg-sky-300 text-sky-950 hover:bg-sky-200";
    }

    return defaultClass + " bg-sky-950 text-sky-300 hover:bg-sky-800";
  };

  return (
    <div className={generateDayViewClassName()}>
      <p className="font-bold m-3">{props.date.date()}</p>
      {generateWfoTeam()}
      {generateHoliday()}
    </div>
  );
};

export default DayCalendarView;
