import CalendedInputHeader from "./CalendedInputHeader";

const CalendedSelect: React.FC<{
  placeholder?: string;
  header?: string;
  mandatory?: boolean;
}> = (props) => {
  return (
    <div className="w-full">
      {props.header && (
        <CalendedInputHeader mandatory={props.mandatory} txt={props.header} />
      )}
      <select className="w-full rounded-lg p-2 shadow-md calended-input-text mb-2 px-2">
        <option value="">MASS LEAVE</option>
        <option value="">HOLIDAY</option>
      </select>
    </div>
  );
};

export default CalendedSelect;
