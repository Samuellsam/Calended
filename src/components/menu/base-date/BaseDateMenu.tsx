import moment, { Moment } from "moment";
import CalendedDatePicker, {
  CALENDED_DATE_PICKER_FORMAT,
} from "../../form/CalendedDatePicker";
import CalendedSelect, { DropdownModel } from "../../form/CalendedSelect";
import { useEffect, useState } from "react";
import CalendedSubmitButton from "../../form/CalendedSubmitButton";
import CalendedForm from "../../form/CalendedForm";
import { Team } from "@/interfaces/Team";
import {
  AlertModel,
  ERROR_ALERT,
  SUCCESS_ALERT,
  WARNING_ALERT,
} from "@/interfaces/AlertModel";
import { BaseDate } from "@/interfaces/BaseDateModel";
import axios from "axios";
import CalendedAlert from "@/components/form/CalendedAlert";
import CalendedListView from "../CalendedListView";
import BaseDateListItem from "./BaseDateListItem";

interface BaseDateCreateForm {
  baseDate: Moment | null;
  wfhTeamId: string | null;
}

const BaseDateMenu: React.FC<{
  onBack?: () => void;
}> = () => {
  const [baseDateCreateForm, setBaseDateCreateForm] =
    useState<BaseDateCreateForm>({
      baseDate: null,
      wfhTeamId: null,
    });

  const [teamOptions, setTeamOptions] = useState<DropdownModel[]>([]);

  const [alert, setAlertMsg] = useState<AlertModel | undefined>();

  const [baseDate, setBaseDate] = useState<BaseDate>();

  useEffect(() => {
    fetchBaseDate();
    fetchTeamOptions();
  }, []);

  useEffect(() => {
    console.log(baseDateCreateForm);
  }, [baseDateCreateForm]);

  const fetchBaseDate = async () => {
    try {
      const response = await axios.get("/api/base-date/get-all");
      const baseDate: BaseDate = response.data.data.baseDate;
      setBaseDate(baseDate);
    } catch (error) {
      console.log(error);
    }

    return [];
  };

  const fetchTeamOptions = async () => {
    try {
      const response = await axios.get("/api/team/get-all");
      setTeamOptions(
        response.data.data.teams.map((team: Team) => {
          return {
            name: team.name,
            value: team.id,
          } as DropdownModel;
        })
      );
      updateForm(
        response.data.data.teams[0] ? response.data.data.teams[0].id : null,
        "wfhTeamId"
      );
    } catch (error) {
      console.log(error);
    }

    return [];
  };

  const updateForm = (newValue: string | null | Moment, attr: string) => {
    setBaseDateCreateForm({
      ...baseDateCreateForm,
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
      const response = await axios.post("/api/base-date/save", {
        baseDate: baseDateCreateForm.baseDate?.format(
          CALENDED_DATE_PICKER_FORMAT
        ),
        wfhTeamId: baseDateCreateForm.wfhTeamId,
      });
      await fetchBaseDate();
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
        <div className="grid grid-cols-2 gap-2">
          <CalendedDatePicker
            header="Base Date"
            mandatory={true}
            onChange={(e) =>
              updateForm(
                e.target.value
                  ? moment(e.target.value, CALENDED_DATE_PICKER_FORMAT)
                  : null,
                "baseDate"
              )
            }
          />
          <CalendedSelect
            header="WFH Team"
            mandatory={true}
            onChange={(e) =>
              updateForm(e.target.value ? e.target.value : null, "wfhTeamId")
            }
            options={teamOptions}
          />
        </div>
        <CalendedSubmitButton value="Set Base Date" />
      </CalendedForm>
      <hr className="m-1" />
      <CalendedListView>
        {baseDate && <BaseDateListItem baseDate={baseDate as BaseDate} />}
      </CalendedListView>
    </>
  );
};

export default BaseDateMenu;
