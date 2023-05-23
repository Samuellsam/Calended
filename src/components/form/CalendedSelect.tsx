import CalendedInputHeader from "./CalendedInputHeader";

export interface DropdownModel {
  name: string;
  value: string | number;
}

const CalendedSelect: React.FC<{
  placeholder?: string;
  header?: string;
  mandatory?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: DropdownModel[];
}> = (props) => {
  return (
    <div className="w-full">
      {props.header && (
        <CalendedInputHeader mandatory={props.mandatory} txt={props.header} />
      )}
      <select
        className="w-full rounded-lg p-2 shadow-md calended-input-text mb-2 px-2"
        onChange={props.onChange}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CalendedSelect;
