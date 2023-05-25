import moment, { Moment } from "moment";
import CalendedDatePicker, {
  CALENDED_DATE_PICKER_FORMAT,
} from "../form/CalendedDatePicker";
import CalendedSelect from "../form/CalendedSelect";
import CalendedSubmitButton from "../form/CalendedSubmitButton";
import CalendedTextInput from "../form/CalendedTextInput";
import { HolidayEnum } from "@/enums/HolidayEnum";
import { useEffect, useState } from "react";
import CalendedForm from "../form/CalendedForm";

interface OffDayCreateForm {
  name: string | null;
  startDate: Moment | null;
  endDate: Moment | null;
  offDayType: HolidayEnum | null;
}

const OffDayMenu: React.FC<{
  onBack?: () => void;
}> = () => {
  const [offDayCreateForm, setOffDayCreateForm] = useState<OffDayCreateForm>({
    name: null,
    startDate: null,
    endDate: null,
    offDayType: null,
  });

  const updateForm = (
    newValue: string | null | Moment | HolidayEnum,
    attr: string
  ) => {
    setOffDayCreateForm({
      ...offDayCreateForm,
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
        header="Off Day Name"
        mandatory={true}
        onChange={(e) =>
          updateForm(e.target.value ? e.target.value : null, "name")
        }
      />
      <div className="grid grid-cols-2 gap-2 w-full">
        <CalendedDatePicker
          header="Start Date"
          placeholder="Start date"
          mandatory={true}
          onChange={(e) =>
            updateForm(
              e.target.value
                ? moment(e.target.value, CALENDED_DATE_PICKER_FORMAT)
                : null,
              "startDate"
            )
          }
        />
        <CalendedDatePicker
          header="End Date"
          placeholder="End date"
          mandatory={true}
          onChange={(e) =>
            updateForm(
              e.target.value
                ? moment(e.target.value, CALENDED_DATE_PICKER_FORMAT)
                : null,
              "endDate"
            )
          }
        />
      </div>
      <CalendedSelect
        header="Off Day Type"
        mandatory={true}
        onChange={(e) => updateForm(e.target.value, "offDayType")}
        options={[
          {
            name: "Holiday",
            value: HolidayEnum.HOLIDAY,
          },
          {
            name: "Mass Leave",
            value: HolidayEnum.MASS_LEAVE,
          },
        ]}
      />
      <CalendedSubmitButton value="Add Off Day" />
    </CalendedForm>
  );
};

export default OffDayMenu;
