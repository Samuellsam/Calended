import { CALENDED_DATE_PICKER_FORMAT } from "@/components/form/CalendedDatePicker";
import { Member, MemberViewModel } from "@/interfaces/Team";
import moment from "moment";

const MemberListItem: React.FC<{
  member: MemberViewModel;
}> = (props) => {
  return (
    <div className="rounded-md bg-slate-100 py-1 px-2 my-2">
      <div className="flex flex-col">
        <p className="font-bold">{`${props.member.name} (Team ${props.member.teamName})`}</p>
        <div className="grid grid-cols-8">
          <p className="col-span-6 text-md">{`Born on ${props.member.birthday.format(
            "DD MMMM YYYY"
          )}`}</p>
          <input type="color" value={props.member.teamColor} disabled={true} />
          <p className="text-sm my-auto">{`${props.member.teamColor}`}</p>
        </div>
      </div>
    </div>
  );
};

export default MemberListItem;
