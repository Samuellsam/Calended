import { ReactNode } from "react";

const CalendedFloatButton: React.FC<{
  onClick: () => void;
  children: ReactNode;
}> = (props) => {
  return (
    <button
      className={`calended-float-button hover:ring bg-slate-100 hover:bg-slate-300`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default CalendedFloatButton;
