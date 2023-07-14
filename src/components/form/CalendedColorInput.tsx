import CalendedInputHeader from "./CalendedInputHeader";

const CalendedColorInput: React.FC<{
  placeholder?: string;
  header?: string;
  mandatory?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string | number;
  disabled?: boolean;
}> = (props) => {
  return (
    <div className="w-full flex flex-col">
      {props.header && (
        <CalendedInputHeader mandatory={props.mandatory} txt={props.header} />
      )}

      <input
        type="color"
        className={`rounded-sm shadow-md mb-2 ${props.className}`}
        onChange={props.onChange}
        value={props.value}
        disabled={props.disabled}
      />
    </div>
  );
};

export default CalendedColorInput;
