import { useState } from "react";
import CalendedTextInput from "../form/CalendedTextInput";
import CalendedSubmitButton from "../form/CalendedSubmitButton";

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
    <form className="calended-form" onSubmit={(e) => e.preventDefault()}>
      <CalendedTextInput
        header="Team Name"
        mandatory={true}
        onChange={(e) =>
          updateForm(e.target.value ? e.target.value : null, "teamName")
        }
      />
      <CalendedSubmitButton value="Add Team" />
    </form>
  );
};

export default TeamMenu;
