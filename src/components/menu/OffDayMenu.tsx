import moment, { Moment } from "moment";
import CalendedDatePicker from "../form/CalendedDatePicker";
import CalendedSelect from "../form/CalendedSelect";
import CalendedSubmitButton from "../form/CalendedSubmitButton";
import CalendedTextInput from "../form/CalendedTextInput";
import { HolidayEnum } from "@/enums/HolidayEnum";
import { useEffect, useState } from "react";

interface OffDayCreateForm {
  name: string | null;
  startDate: Moment | null;
  endDate: Moment | null;
  offDayType: HolidayEnum | null;
}

const OffDayMenu: React.FC<{}> = () => {
  const [offDayCreateForm, setOffDayCreateForm] = useState<OffDayCreateForm>({
    name: null,
    startDate: null,
    endDate: null,
    offDayType: null,
  });

  useEffect(() => {
    console.log(offDayCreateForm);
  }, [offDayCreateForm]);

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
    <div className="mt-20">
      <form
        className="flex flex-column flex-wrap"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <CalendedTextInput
          header="OFF DAY NAME"
          placeholder="Off day name"
          mandatory={true}
          onChange={(e) => updateForm(e.target.value, "name")}
        />
        <div className="grid grid-cols-2 gap-2 w-full">
          <CalendedDatePicker
            header="START DATE"
            placeholder="Start date"
            mandatory={true}
            onChange={(e) =>
              updateForm(moment(e.target.value, "yyyy-mm-dd"), "startDate")
            }
          />
          <CalendedDatePicker
            header="END DATE"
            placeholder="End date"
            mandatory={true}
            onChange={(e) =>
              updateForm(moment(e.target.value, "yyyy-mm-dd"), "endDate")
            }
          />
        </div>
        <CalendedSelect
          header="OFF DAY TYPE"
          mandatory={true}
          onChange={(e) => updateForm(e.target.value, "offDayType")}
          options={[
            {
              name: "HOLIDAY",
              value: HolidayEnum.HOLIDAY,
            },
            {
              name: "MASS LEAVE",
              value: HolidayEnum.MASS_LEAVE,
            },
          ]}
        />
        <CalendedSubmitButton value="ADD OFF DAY" />
      </form>
    </div>
  );
};

export default OffDayMenu;
