import CalendedInputHeader from "./CalendedInputHeader";

export const CALENDED_DATE_PICKER_FORMAT: string = "yyyy-mm-dd";

const CalendedDatePicker: React.FC<{
  placeholder?: string;
  header?: string;
  mandatory?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = (props) => {
  return (
    <div className="w-full">
      {props.header && (
        <CalendedInputHeader mandatory={props.mandatory} txt={props.header} />
      )}
      <input
        type="date"
        className="w-full rounded-lg p-2 shadow-md calended-input-text mb-2"
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  );
};

export default CalendedDatePicker;
