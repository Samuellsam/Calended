import CalendedInputHeader from "./CalendedInputHeader";

export const CALENDED_DATE_PICKER_FORMAT: string = "YYYY-MM-DD";

const CalendedDatePicker: React.FC<{
  placeholder?: string;
  header?: string;
  mandatory?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}> = (props) => {
  return (
    <div className="w-full">
      {props.header && (
        <CalendedInputHeader mandatory={props.mandatory} txt={props.header} />
      )}
      <input
        type="date"
        className={`w-full rounded-lg p-2 shadow-md calended-input-text mb-2 ${props.className}`}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  );
};

export default CalendedDatePicker;
