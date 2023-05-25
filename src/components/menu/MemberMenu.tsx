import { WfhTeamEnum } from "@/enums/WfhTeamEnum";
import CalendedSelect from "../form/CalendedSelect";
import CalendedTextInput from "../form/CalendedTextInput";
import CalendedSubmitButton from "../form/CalendedSubmitButton";
import { useState } from "react";
import CalendedForm from "../form/CalendedForm";

interface MemberCreateForm {
  name: string | null;
  teamName: WfhTeamEnum | null;
}

const MemberMenu: React.FC<{
  onBack?: () => void;
}> = () => {
  const [memberCreateForm, setMemberCreateForm] = useState<MemberCreateForm>({
    name: null,
    teamName: null,
  });

  const updateForm = (newValue: string | null | WfhTeamEnum, attr: string) => {
    setMemberCreateForm({
      ...memberCreateForm,
      [attr]: newValue,
    });
  };

  return (
    <CalendedForm onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-4 w-full gap-2">
        <div className="col-span-3">
          <CalendedTextInput
            className="col-span-3"
            header="Member Name"
            mandatory={true}
            onChange={(e) =>
              updateForm(e.target.value ? e.target.value : null, "name")
            }
          />
        </div>
        <CalendedSelect
          header="Team"
          mandatory={true}
          onChange={(e) =>
            updateForm(e.target.value ? e.target.value : null, "teamName")
          }
          options={[
            {
              name: "A",
              value: WfhTeamEnum.A,
            },
            {
              name: "B",
              value: WfhTeamEnum.B,
            },
            {
              name: "C",
              value: WfhTeamEnum.C,
            },
            {
              name: "D",
              value: WfhTeamEnum.D,
            },
          ]}
        />
      </div>
      <CalendedSubmitButton value="Add Member" />
    </CalendedForm>
  );
};

export default MemberMenu;
