const CalendedForm: React.FC<{
  onSubmit: (e: React.SyntheticEvent) => void;
  children: React.ReactNode;
}> = (props) => {
  return (
    <form className="calended-form" onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
};

export default CalendedForm;
