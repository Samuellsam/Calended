const DayCalendarView: React.FC<{
  date: number;
}> = (props) => {
  return (
    <div className="bg-teal-100 p-4 day-view rounded-lg">
      <p className="text-teal-600 font-bold">{props.date}</p>
    </div>
  );
};

export default DayCalendarView;
