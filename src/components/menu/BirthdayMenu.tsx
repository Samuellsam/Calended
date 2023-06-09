import moment, { Moment } from "moment";
import CalendedDatePicker, {
  CALENDED_DATE_PICKER_FORMAT,
} from "../form/CalendedDatePicker";
import CalendedForm from "../form/CalendedForm";
import CalendedSelect from "../form/CalendedSelect";
import CalendedSubmitButton from "../form/CalendedSubmitButton";
import { useState } from "react";

interface BirthdayCreateForm {
  member: string | null;
  birthDate: Moment | null;
}

const BirthDayMenu: React.FC<{
  onBack?: () => void;
}> = () => {
  const [BirthdayCreateForm, setBirthdayCreateForm] =
    useState<BirthdayCreateForm>({
      member: null,
      birthDate: null,
    });

  const updateForm = (newValue: string | null | Moment, attr: string) => {
    setBirthdayCreateForm({
      ...BirthdayCreateForm,
      [attr]: newValue,
    });
  };

  return (
    <CalendedForm onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-2 gap-2 w-full">
        <CalendedSelect
          options={[]}
          header="Member"
          mandatory={true}
          onChange={(e) => updateForm(e.target.value, "member")}
        />
        <CalendedDatePicker
          header="Birthdate"
          mandatory={true}
          onChange={(e) =>
            updateForm(
              e.target.value
                ? moment(e.target.value, CALENDED_DATE_PICKER_FORMAT)
                : null,
              "birthDate"
            )
          }
        />
      </div>
      <CalendedSubmitButton value="Add Birthday" />
    </CalendedForm>
  );
};

export default BirthDayMenu;
