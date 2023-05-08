import { Holiday } from "@/interfaces/Holiday";
import HolidayBanner from "./HolidayBanner";
import moment, { Moment } from "moment";
import { isDateInMonth, isDateSame, today, todayMonth } from "@/util/DateUtil";
import { MonthEnum } from "@/enums/MonthEnum";
import WfoCover from "./WfoCover";
import { WfhTeamEnum } from "@/enums/WfhTeamEnum";
import TodaySign from "./TodaySign";

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
        {/* {props.holidays.map((h, idx) => (
          <HolidayBanner holiday={h} key={idx} />
        ))} */}
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
        " bg-gradient-to-r from-red-500 to-red-800 text-slate-100 border-dashed border-2 border-slate-50"
      );
    // return defaultClass + " bg-red-600 text-slate-100 hover:bg-red-500";

    if (isDateSame(props.date, today()))
      return defaultClass + " bg-slate-100 text-slate-950";

    if (isDateInMonth(props.date, props.calendarMonth)) {
      if (props.wfhTeam === WfhTeamEnum.A)
        return (
          defaultClass +
          " bg-gradient-to-r from-amber-200 to-amber-500 text-slate-950"
        );

      if (props.wfhTeam === WfhTeamEnum.B)
        return (
          defaultClass +
          " bg-gradient-to-r from-lime-200 to-lime-500 text-slate-950"
        );

      if (props.wfhTeam === WfhTeamEnum.C)
        return (
          defaultClass +
          " bg-gradient-to-r from-orange-200 to-orange-500 text-slate-950"
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
      {generateHoliday()}
    </div>
  );
};

export default DayCalendarView;
