import CalendedInputHeader from "./CalendedInputHeader";

const CalendedTextInput: React.FC<{
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
        type="text"
        className="w-full rounded-lg p-2 shadow-md calended-input-text mb-2"
      />
    </div>
  );
};

export default CalendedTextInput;
