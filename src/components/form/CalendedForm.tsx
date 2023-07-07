import { AlertModel } from "@/interfaces/AlertModel";
import CalendedAlert from "./CalendedAlert";

const CalendedForm: React.FC<{
  onSubmit: (e: React.SyntheticEvent) => void;
  children: React.ReactNode;
}> = (props) => {
  return (
    <div>
      <form className="calended-form" onSubmit={props.onSubmit}>
        {props.children}
      </form>
    </div>
  );
};

export default CalendedForm;
