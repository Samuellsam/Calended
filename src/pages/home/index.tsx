import { firstDayOfMonth, lastDayOfMonth } from "@/util/DateUtil";
import DayView from "../../components/day-view/DayView";
import moment, { Moment } from "moment";
import { MonthEnum } from "@/enums/MonthEnum";

const HomePage: React.FC<{}> = () => {
  const generateDayCalendarItem = () => {
    const dayCalendarItem = [];

    const currDate: Moment = firstDayOfMonth(MonthEnum.JUNE, 2023);
    const endDate: Moment = lastDayOfMonth(MonthEnum.JUNE, 2023);

    while (currDate.isSameOrBefore(endDate)) {
      dayCalendarItem.push(
        <DayView
          key={currDate.toString()}
          date={moment(currDate)}
          holidays={[]}
          calendarMonth={MonthEnum.JUNE}
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
