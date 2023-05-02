import {
  firstDayOfMonth,
  lastDayOfMonth,
  todayMonth,
  todayYear,
} from "@/util/DateUtil";
import DayView from "../../components/day-view/DayView";
import moment, { Moment } from "moment";
import { MonthEnum } from "@/enums/MonthEnum";
import { useState } from "react";
import { WfhTeamEnum } from "@/enums/WfhTeamEnum";

const HomePage: React.FC<{}> = () => {
  const [month, setMonth] = useState<MonthEnum>(todayMonth());
  const [year, setYear] = useState<number>(todayYear());

  const generateDayCalendarItem = () => {
    const dayCalendarItem = [];

    const currDate: Moment = firstDayOfMonth(month, year);
    const endDate: Moment = lastDayOfMonth(month, year);

    while (currDate.isSameOrBefore(endDate)) {
      dayCalendarItem.push(
        <DayView
          key={currDate.toString()}
          date={moment(currDate)}
          holidays={[]}
          calendarMonth={month}
          wfhTeam={
            currDate.get("date") % 4 == 0
              ? WfhTeamEnum.A
              : currDate.get("date") % 4 == 1
              ? WfhTeamEnum.B
              : currDate.get("date") % 4 == 2
              ? WfhTeamEnum.C
              : currDate.get("date") % 4 == 3
              ? WfhTeamEnum.D
              : undefined
          }
        />
      );
      currDate.add(1, "days");
    }

    return dayCalendarItem;
  };

  return (
    <div>
      <div className="day-view-container flex flex-row flex-wrap justify-start mx-auto">
        {generateDayCalendarItem()}
      </div>
    </div>
  );
};

export default HomePage;
