import moment, { Moment } from "moment";
import CalendedDatePicker, {
  CALENDED_DATE_PICKER_FORMAT,
} from "../form/CalendedDatePicker";
import CalendedSelect from "../form/CalendedSelect";
import { WfhTeamEnum } from "@/enums/WfhTeamEnum";
import { useState } from "react";
import CalendedSubmitButton from "../form/CalendedSubmitButton";

interface BaseDateCreateForm {
  baseDate: Moment | null;
  wfhTeam: WfhTeamEnum | null;
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
    newValue: string | null | Moment | WfhTeamEnum,
    attr: string
  ) => {
    setBaseDateCreateForm({
      ...baseDateCreateForm,
      [attr]: newValue,
    });
  };

  return (
    <form className="calended-form" onSubmit={(e) => e.preventDefault()}>
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
      <CalendedSubmitButton value="Set Base Date" />
    </form>
  );
};

export default BaseDateMenu;
