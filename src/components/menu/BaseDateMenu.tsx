import moment, { Moment } from "moment";
import CalendedDatePicker, {
  CALENDED_DATE_PICKER_FORMAT,
} from "../form/CalendedDatePicker";
import CalendedSelect from "../form/CalendedSelect";
import { useState } from "react";
import CalendedSubmitButton from "../form/CalendedSubmitButton";
import CalendedForm from "../form/CalendedForm";
import { WfhTeamModel } from "@/interfaces/WfhTeamModel.js";

interface BaseDateCreateForm {
  baseDate: Moment | null;
  wfhTeam: WfhTeamModel | null;
}

const BaseDateMenu: React.FC<{
  onBack?: () => void;
}> = () => {
  const [baseDateCreateForm, setBaseDateCreateForm] =
    useState<BaseDateCreateForm>({
      baseDate: null,
      wfhTeam: null,
    });

  const updateForm = (
    newValue: string | null | Moment | WfhTeamModel,
    attr: string
  ) => {
    setBaseDateCreateForm({
      ...baseDateCreateForm,
      [attr]: newValue,
    });
  };

  return (
    <CalendedForm onSubmit={(e) => e.preventDefault()}>
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
            updateForm(e.target.value ? e.target.value : null, "wfhTeam")
          }
          options={[
            {
              name: "A",
              value: "A",
            },
            {
              name: "B",
              value: "B",
            },
            {
              name: "C",
              value: "C",
            },
            {
              name: "D",
              value: "D",
            },
          ]}
        />
      </div>
      <CalendedSubmitButton value="Set Base Date" />
    </CalendedForm>
  );
};

export default BaseDateMenu;
