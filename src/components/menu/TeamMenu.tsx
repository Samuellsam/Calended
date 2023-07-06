import { useEffect, useState } from "react";
import CalendedTextInput from "../form/CalendedTextInput";
import CalendedSubmitButton from "../form/CalendedSubmitButton";
import CalendedForm from "../form/CalendedForm";
import CalendedColorInput from "../form/CalendedColorInput";
import axios, { AxiosError } from "axios";

interface TeamCreateForm {
  name: string | null;
  color: string | null;
}

const TeamMenu: React.FC<{
  onBack?: () => void;
}> = () => {
  const [teamCreateForm, setTeamCreateForm] = useState<TeamCreateForm>({
    name: null,
    color: null,
  });

  const [alertMsg, setAlertMsg] = useState<string>();

  const updateForm = (newValue: string | null, attr: string) => {
    setTeamCreateForm({
      ...teamCreateForm,
      [attr]: newValue,
    });
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/team/save", {
        name: teamCreateForm.name,
        color: teamCreateForm.color,
      });
      setAlertMsg(
        `${response.status} - ${response.data.message}`.toUpperCase()
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setAlertMsg(
          `${error.response?.status} - ${error.response?.data.message}`.toUpperCase()
        );
      }
    }
  };

  return (
    <CalendedForm alert={alertMsg} onSubmit={(e) => onSubmit(e)}>
      <div className="grid grid-cols-4 w-full gap-2">
        <div className="col-span-3">
          <CalendedTextInput
            header="Team Name"
            mandatory={true}
            onChange={(e) =>
              updateForm(e.target.value ? e.target.value : null, "name")
            }
          />
        </div>
        <CalendedColorInput
          header="Signature"
          className="w-full h-full"
          mandatory={true}
          onChange={(e) =>
            updateForm(e.target.value ? e.target.value : null, "color")
          }
        />
      </div>
      <CalendedSubmitButton value="Add Team" />
    </CalendedForm>
  );
};

export default TeamMenu;
