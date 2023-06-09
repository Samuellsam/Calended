import Logo from "@/components/Logo";
import Calendar from "@/components/Calendar";
import Menu from "@/components/menu/Menu";
import CalendedFloatButton from "@/components/button/CalendedFloatButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faLocation } from "@fortawesome/free-solid-svg-icons";

const HomePage: React.FC<{}> = () => {
  const scrollToToday = () => {
    document
      .getElementById("today-sign")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative">
      <CalendedFloatButton onClick={scrollToToday}>
        <FontAwesomeIcon icon={faCalendarDay} />
      </CalendedFloatButton>
      <Menu />
      <div>
        <Logo />
        <Calendar />
      </div>
    </div>
  );
};

export default HomePage;
