import DayView from "../components/day_view/DayView";

const HomePage: React.FC<{}> = () => {
  const generateDayCalendarItem = () => {
    const dayCalendarItem = [];
    for (let i = 1; i <= 31; i++) {
      dayCalendarItem.push(
        <DayView
          key={i}
          date={i}
          holidays={
            i == 3
              ? [
                  {
                    isFirst: true,
                    isLast: true,
                    from: new Date(),
                    to: new Date(),
                    name: "Christmas",
                  },
                  {
                    isFirst: true,
                    isLast: true,
                    from: new Date(),
                    to: new Date(),
                    name: "Idul Fitri",
                  },
                  {
                    isFirst: true,
                    isLast: true,
                    from: new Date(),
                    to: new Date(),
                    name: "Cuti Bersama",
                  },
                ]
              : []
          }
        />
      );
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
