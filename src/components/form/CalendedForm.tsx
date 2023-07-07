import { AlertModel } from "@/interfaces/AlertModel";
import CalendedAlert from "./CalendedAlert";

const CalendedForm: React.FC<{
  onSubmit: (e: React.SyntheticEvent) => void;
  children: React.ReactNode;
  alert?: AlertModel;
}> = (props) => {
  return (
    <div>
      <CalendedAlert alert={props.alert} />
      <hr className="mb-2 mt-1 mx-2" />
      <form className="calended-form" onSubmit={props.onSubmit}>
        {props.children}
      </form>
    </div>
  );
};

export default CalendedForm;
