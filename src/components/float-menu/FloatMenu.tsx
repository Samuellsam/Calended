import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CalendedFloatButton from "./CalendedFloatButton";
import {
  faBacon,
  faBacterium,
  faCalendarDay,
  faSync,
} from "@fortawesome/free-solid-svg-icons";
import { CalendarViewEnum } from "@/enums/CalendarViewEnum";

const FloatMenu: React.FC<{
  onToggleView: () => void;
  onSyncView: () => void;
  calendarView: CalendarViewEnum;
}> = (props) => {
  const scrollToToday = () => {
    document
      .getElementById("today-sign")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="float-menu-container">
      <div className="float-menu grid grid-cols-1">
        <CalendedFloatButton onClick={scrollToToday}>
          <FontAwesomeIcon icon={faCalendarDay} />
        </CalendedFloatButton>
        <CalendedFloatButton onClick={props.onToggleView}>
          {props.calendarView == CalendarViewEnum.MONTH_VIEW ? (
            <FontAwesomeIcon icon={faBacterium} />
          ) : (
            <FontAwesomeIcon icon={faBacon} />
          )}
        </CalendedFloatButton>
        <CalendedFloatButton onClick={props.onSyncView}>
          <FontAwesomeIcon icon={faSync} />
        </CalendedFloatButton>
      </div>
    </div>
  );
};

export default FloatMenu;
