import { useEffect, useState } from "react";
import CalendedTextInput from "../../form/CalendedTextInput";
import CalendedSubmitButton from "../../form/CalendedSubmitButton";
import CalendedForm from "../../form/CalendedForm";
import CalendedColorInput from "../../form/CalendedColorInput";
import axios, { AxiosError } from "axios";
import {
  AlertModel,
  ERROR_ALERT,
  WARNING_ALERT,
  SUCCESS_ALERT,
} from "@/interfaces/AlertModel";
import CalendedAlert from "@/components/form/CalendedAlert";
import TeamListView from "./TeamListView";
import { Team } from "@/interfaces/Team";

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

  const [alert, setAlertMsg] = useState<AlertModel | undefined>();

  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get("/api/team/get-all");
      setTeams(response.data.data.teams);
    } catch (error) {
      console.log(error);
    }

    return [];
  };

  const updateForm = (newValue: string | null, attr: string) => {
    setTeamCreateForm({
      ...teamCreateForm,
      [attr]: newValue,
    });
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setAlertMsg({
      message: "PLEASE WAIT",
      type: WARNING_ALERT,
    });

    try {
      const response = await axios.post("/api/team/save", {
        name: teamCreateForm.name,
        color: teamCreateForm.color,
      });
      await fetchTeams();
      setAlertMsg({
        message: `${response.status} - ${response.data.message}`.toUpperCase(),
        type: SUCCESS_ALERT,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setAlertMsg({
          message:
            `${error.response?.status} - ${error.response?.data.message}`.toUpperCase(),
          type: ERROR_ALERT,
        });
      }
    }
  };

  return (
    <>
      <CalendedAlert alert={alert} />
      <hr className="m-1" />
      <CalendedForm onSubmit={(e) => onSubmit(e)}>
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
      <hr className="m-1" />
      <TeamListView teams={teams} />
    </>
  );
};

export default TeamMenu;
