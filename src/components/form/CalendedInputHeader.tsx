const CalendedInputHeader: React.FC<{
  txt: string;
  mandatory?: boolean;
  className?: string;
}> = (props) => {
  return (
    <p
      className={`font-bold px-1 mb-1 calended-form-header text-orange-300 ${props.className}`}
    >
      {props.txt}
      {props.mandatory && <span className="text-red-500"> *</span>}
    </p>
  );
};

export default CalendedInputHeader;
