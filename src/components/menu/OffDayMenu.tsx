import CalendedDatePicker from "../form/CalendedDatePicker";
import CalendedSelect from "../form/CalendedSelect";
import CalendedSubmitButton from "../form/CalendedSubmitButton";
import CalendedTextInput from "../form/CalendedTextInput";

const OffDayMenu: React.FC<{}> = () => {
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
        />
        <div className="grid grid-cols-2 gap-2 w-full">
          <CalendedDatePicker
            header="START DATE"
            placeholder="Start date"
            mandatory={true}
          />
          <CalendedDatePicker
            header="END DATE"
            placeholder="End date"
            mandatory={true}
          />
        </div>
        <CalendedSelect header="OFF DAY TYPE" mandatory={true} />
        <CalendedSubmitButton value="ADD OFF DAY" />
      </form>
    </div>
  );
};

export default OffDayMenu;
