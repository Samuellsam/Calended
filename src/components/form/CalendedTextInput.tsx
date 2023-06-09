import CalendedInputHeader from "./CalendedInputHeader";

const CalendedTextInput: React.FC<{
  placeholder?: string;
  header?: string;
  mandatory?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string | number;
  disabled?: boolean;
}> = (props) => {
  return (
    <div className="w-full">
      {props.header && (
        <CalendedInputHeader mandatory={props.mandatory} txt={props.header} />
      )}

      <input
        type="text"
        className={`w-full rounded-lg p-2 shadow-md calended-input-text mb-2 ${props.className}`}
        onChange={props.onChange}
        value={props.value}
        disabled={props.disabled}
      />
    </div>
  );
};

export default CalendedTextInput;
