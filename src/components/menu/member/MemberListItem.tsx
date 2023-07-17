import { CALENDED_DATE_PICKER_FORMAT } from "@/components/form/CalendedDatePicker";
import { Member } from "@/interfaces/Team";
import moment from "moment";

const MemberListItem: React.FC<{
  member: Member;
}> = (props) => {
  return (
    <div className="rounded-md bg-slate-100 py-1 px-2 my-2">
      <div className="flex flex-col">
        <p>{props.member.name}</p>
        <p>{moment(props.member.birthday).toString()}</p>
      </div>
    </div>
  );
};

export default MemberListItem;
