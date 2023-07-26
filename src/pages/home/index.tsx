import Menu from "@/components/menu/Menu";
import FloatMenu from "@/components/float-menu/FloatMenu";
import { useState } from "react";
import { CalendarViewEnum } from "@/enums/CalendarViewEnum";
import Logo from "@/components/Logo";
import Calendar from "@/components/Calendar";

const HomePage: React.FC<{}> = () => {
  const [calendarView, setCalendarView] = useState(CalendarViewEnum.MONTH_VIEW);

  const toggleCalendarView = () => {
    setCalendarView(
      calendarView == CalendarViewEnum.MONTH_VIEW
        ? CalendarViewEnum.YEAR_VIEW
        : CalendarViewEnum.MONTH_VIEW
    );
  };

  return (
    <div className="relative">
      <Menu />
      <FloatMenu
        onToggleView={toggleCalendarView}
        calendarView={calendarView}
      />
      {/* <div>
        <Logo />
        <Calendar calendarView={calendarView} />
      </div> */}
    </div>
  );
};

export default HomePage;
