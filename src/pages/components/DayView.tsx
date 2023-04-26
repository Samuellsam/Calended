const DayCalendarView: React.FC<{
  date: number;
}> = (props) => {
  return (
    <div className="p-4 day-view rounded-lg">
      <p className="font-bold">{props.date}</p>
    </div>
  );
};

export default DayCalendarView;
