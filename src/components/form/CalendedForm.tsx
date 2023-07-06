const CalendedForm: React.FC<{
  onSubmit: (e: React.SyntheticEvent) => void;
  children: React.ReactNode;
  alert: string | undefined;
}> = (props) => {
  return (
    <div>
      <p
        className={`small bg-slate-100 p-2 card rounded-md font-bold text-center ${
          props.alert?.includes("200") ? " text-lime-400" : " text-red-400"
        }`}
      >
        {props.alert}
      </p>
      <form className="calended-form" onSubmit={props.onSubmit}>
        {props.children}
      </form>
    </div>
  );
};

export default CalendedForm;
