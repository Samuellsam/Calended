import { ReactNode } from "react";

const CalendedListView: React.FC<{ children: ReactNode }> = (props) => {
  return (
    <div
      className="overflow-y-auto"
      style={{
        height: "300px",
      }}
    >
      {props.children}
    </div>
  );
};

export default CalendedListView;
