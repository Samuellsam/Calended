import { Holiday } from "@/interfaces/Holiday";

const HolidayBanner: React.FC<{
  holiday: Holiday;
}> = (props) => {
  return (
    <div className="bg-amber-600 my-1 text-slate-100 px-1 text-sm italic">
      <p>{props.holiday.name}</p>
    </div>
  );
};

export default HolidayBanner;
