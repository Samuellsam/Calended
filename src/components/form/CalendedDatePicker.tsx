import CalendedInputHeader from "./CalendedInputHeader";

const CalendedDatePicker: React.FC<{
  placeholder?: string;
  header?: string;
  mandatory?: boolean;
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
      />
    </div>
  );
};

export default CalendedDatePicker;
