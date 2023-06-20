import { useState } from "react";
import CalendedTextInput from "../form/CalendedTextInput";
import CalendedSubmitButton from "../form/CalendedSubmitButton";
import CalendedForm from "../form/CalendedForm";

interface TeamCreateForm {
  name: string | null;
}

const TeamMenu: React.FC<{
  onBack?: () => void;
}> = () => {
  const [teamCreateForm, setTeamCreateForm] = useState<TeamCreateForm>({
    name: null,
  });

  const updateForm = (newValue: string | null, attr: string) => {
    setTeamCreateForm({
      ...teamCreateForm,
      [attr]: newValue,
    });
  };

  return (
    <CalendedForm
      onSubmit={ async (e) => {
        e.preventDefault();

        const options = {
          // The method is POST because we are sending data.
          method: 'POST',
          // Tell the server we're sending JSON.
          headers: {
            'Content-Type'                : 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          },
          // Body of the request is the JSON data we created above.
          body: JSON.stringify(teamCreateForm),
        }

        // console.log(options);
        // console.log(teamCreateForm);
        const response = await fetch('/api/team/save', options)
        const result   = await response.json()
        alert(result.message);
      }}
    >
      <CalendedTextInput
        header="Team Name"
        mandatory={true}
        onChange={(e) =>
          updateForm(e.target.value ? e.target.value : null, "name")
        }
      />
      <CalendedSubmitButton value="Add Team" />
    </CalendedForm>
  );
};

export default TeamMenu;
