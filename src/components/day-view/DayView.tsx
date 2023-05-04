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
    if (!props.holidays) return <></>;
    return (
      <>
        {props.holidays.map((h, idx) => (
          <HolidayBanner holiday={h} key={idx} />
        ))}
      </>
    );
  };

  const generateWfoTeam = () => {
    if ((props.holidays && props.holidays.length > 0) || !props.wfhTeam)
      return <></>;

    return <WfoCover wfhTeam={props.wfhTeam} />;
  };

  const generateDayViewClassName = () => {
    let defaultClass =
      "day-view relative rounded-lg hover:transition-all duration-150 cursor-pointer";

    if (props.holidays && props.holidays.length > 0)
      return (
        defaultClass +
        " bg-gradient-to-r from-red-300 to-red-500 text-slate-100 hover:bg-red-500"
      );
    // return defaultClass + " bg-red-600 text-slate-100 hover:bg-red-500";

    if (isDateSame(props.date, moment()))
      return defaultClass + " bg-slate-100 text-slate-950 hover:bg-slate-100";

    if (isDateInMonth(props.date, props.calendarMonth)) {
      if (props.wfhTeam === WfhTeamEnum.A)
        return (
          defaultClass +
          " bg-gradient-to-r from-amber-300 to-amber-500 text-slate-950"
        );
      // return defaultClass + " bg-amber-300 text-slate-950";
      if (props.wfhTeam === WfhTeamEnum.B)
        return (
          defaultClass +
          " bg-gradient-to-r from-lime-300 to-lime-500 text-slate-950"
        );
      // return defaultClass + " bg-lime-300 text-slate-950";
      if (props.wfhTeam === WfhTeamEnum.C)
        return (
          defaultClass +
          " bg-gradient-to-r from-orange-300 to-orange-500 text-slate-950"
        );
      // return defaultClass + " bg-orange-300 text-slate-950";
      if (props.wfhTeam === WfhTeamEnum.D)
        return (
          defaultClass +
          " bg-gradient-to-r from-cyan-300 to-cyan-500 text-slate-950"
        );
      // return defaultClass + " bg-violet-300 text-slate-950";

      return defaultClass + " bg-sky-800 text-sky-400 hover:bg-sky-200";
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
