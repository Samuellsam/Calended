const DayViewHeader: React.FC<{
  header: string;
}> = (props) => {
  return (
    <div className="day-view-header text-slate-50 font-bold flex">
      <p className="my-auto ml-1">{props.header}</p>
    </div>
  );
};

export default DayViewHeader;
