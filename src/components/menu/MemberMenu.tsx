import CalendedSelect, { DropdownModel } from "../form/CalendedSelect";
import CalendedTextInput from "../form/CalendedTextInput";
import CalendedSubmitButton from "../form/CalendedSubmitButton";
import { useEffect, useState } from "react";
import CalendedForm from "../form/CalendedForm";
import { Team } from "@/interfaces/Team";
import axios from "axios";

interface MemberCreateForm {
  name: string | null;
  teamName: Team | null;
}

const MemberMenu: React.FC<{
  onBack?: () => void;
}> = () => {
  const [memberCreateForm, setMemberCreateForm] = useState<MemberCreateForm>({
    name: null,
    teamName: null,
  });

  const [teamOptions, setTeamOptions] = useState<DropdownModel[]>([]);

  useEffect(() => {
    fetchTeamOptions();
  }, []);

  const fetchTeamOptions = async () => {
    try {
      const response = await axios.get("/api/team/get-all");
      setTeamOptions(
        response.data.data.teams.map((team: Team) => {
          return {
            name: team.name,
            value: team.name,
          } as DropdownModel;
        })
      );
    } catch (error) {
      console.log(error);
    }

    return [];
  };

  const updateForm = (newValue: string | null | Team, attr: string) => {
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
          options={teamOptions}
        />
      </div>
      <CalendedSubmitButton value="Add Member" />
    </CalendedForm>
  );
};

export default MemberMenu;
