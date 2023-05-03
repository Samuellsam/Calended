import { Holiday } from "@/interfaces/Holiday";

const HolidayBanner: React.FC<{
  holiday: Holiday;
}> = (props) => {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-yellow-500 my-1 text-slate-100 px-1 text-sm italic font-bold">
      <p>{props.holiday.name}</p>
    </div>
  );
};

export default HolidayBanner;
