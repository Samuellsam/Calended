import moment, { Moment } from "moment";
import CalendedDatePicker, {
  CALENDED_DATE_PICKER_FORMAT,
} from "../../form/CalendedDatePicker";
import CalendedSelect from "../../form/CalendedSelect";
import CalendedSubmitButton from "../../form/CalendedSubmitButton";
import CalendedTextInput from "../../form/CalendedTextInput";
import { HolidayEnum } from "@/enums/HolidayEnum";
import { useEffect, useState } from "react";
import CalendedForm from "../../form/CalendedForm";
import {
  AlertModel,
  ERROR_ALERT,
  SUCCESS_ALERT,
  WARNING_ALERT,
} from "@/interfaces/AlertModel";
import axios from "axios";
import { OffDay } from "@/interfaces/Holiday";
import CalendedListView from "../CalendedListView";
import OffDayListItem from "./OffDayListItem";
import CalendedAlert from "@/components/form/CalendedAlert";

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

  const [alert, setAlertMsg] = useState<AlertModel | undefined>();

  const [offDays, setOffDays] = useState<OffDay[]>([]);

  const updateForm = (
    newValue: string | null | Moment | HolidayEnum,
    attr: string
  ) => {
    setOffDayCreateForm({
      ...offDayCreateForm,
      [attr]: newValue,
    });
  };

  useEffect(() => {
    fetchOffDay();
  }, []);

  const fetchOffDay = async () => {
    try {
      const response = await axios.get("/api/holiday/get-all");
      const offDays: OffDay[] = response.data.data.holidays;
      setOffDays(
        offDays.map((o) => {
          return {
            ...o,
            startDate: moment(
              offDayCreateForm.startDate,
              CALENDED_DATE_PICKER_FORMAT
            ),
            endDate: moment(
              offDayCreateForm.endDate,
              CALENDED_DATE_PICKER_FORMAT
            ),
          };
        })
      );
    } catch (error) {
      console.log(error);
    }

    return [];
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setAlertMsg({
      message: "PLEASE WAIT",
      type: WARNING_ALERT,
    });

    try {
      const response = await axios.post("/api/holiday/save", {
        name: offDayCreateForm.name,
        startDate: offDayCreateForm.startDate?.format(
          CALENDED_DATE_PICKER_FORMAT
        ),
        endDate: offDayCreateForm.endDate?.format(CALENDED_DATE_PICKER_FORMAT),
        offDayType: offDayCreateForm.offDayType,
      });
      await fetchOffDay();
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
      <CalendedForm onSubmit={onSubmit}>
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
      <hr className="m-1" />
      <CalendedListView>
        {offDays.map((o) => (
          <OffDayListItem offDay={o} key={o.id} />
        ))}
      </CalendedListView>
    </>
  );
};

export default OffDayMenu;
