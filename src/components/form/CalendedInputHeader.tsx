const CalendedInputHeader: React.FC<{
  txt: string;
  mandatory?: boolean;
}> = (props) => {
  return (
    <small className="font-bold px-1">
      {props.txt}
      {props.mandatory && <span className="text-red-500"> *</span>}
    </small>
  );
};

export default CalendedInputHeader;
