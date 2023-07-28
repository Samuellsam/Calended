import { CALENDED_DATE_PICKER_FORMAT } from "@/components/form/CalendedDatePicker";
import { OffDay } from "@/interfaces/Holiday";
import { Member, MemberViewModel } from "@/interfaces/Team";
import moment from "moment";

const OffDayListItem: React.FC<{
  offDay: OffDay;
}> = (props) => {
  return (
    <div className="rounded-md bg-slate-100 py-1 px-2 my-2">
      <div className="flex flex-col">
        <p className="font-bold">{`${props.offDay.name} - (${
          props.offDay.type == 0 ? "HOLIDAY" : "MASS LEAVE"
        })`}</p>
        {props.offDay.from == props.offDay.to ? (
          <p>{`${props.offDay.from}`}</p>
        ) : (
          <p>{`${props.offDay.from} until ${props.offDay.to}`}</p>
        )}
      </div>
    </div>
  );
};

export default OffDayListItem;
