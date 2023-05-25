import { useState } from "react";
import CalendedTextInput from "../form/CalendedTextInput";
import CalendedSubmitButton from "../form/CalendedSubmitButton";
import CalendedForm from "../form/CalendedForm";

interface TeamCreateForm {
  teamName: string | null;
}

const TeamMenu: React.FC<{
  onBack?: () => void;
}> = () => {
  const [teamCreateForm, setTeamCreateForm] = useState<TeamCreateForm>({
    teamName: null,
  });

  const updateForm = (newValue: string | null, attr: string) => {
    setTeamCreateForm({
      ...teamCreateForm,
      [attr]: newValue,
    });
  };

  return (
    <CalendedForm
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <CalendedTextInput
        header="Team Name"
        mandatory={true}
        onChange={(e) =>
          updateForm(e.target.value ? e.target.value : null, "teamName")
        }
      />
      <CalendedSubmitButton value="Add Team" />
    </CalendedForm>
  );
};

export default TeamMenu;
