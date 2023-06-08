const CalendedSubmitButton: React.FC<{
  value: string;
  className?: string;
}> = (props) => {
  return (
    <input
      type="submit"
      value={props.value}
      className={`w-full rounded-lg p-2 shadow-md calended-input-text mb-2 cursor-pointer hover:bg-slate-400 text-orange-400 hover:text-orange-300 font-bold mt-4 shadow-md bg-slate-500 ${props.className}`}
    />
  );
};

export default CalendedSubmitButton;
