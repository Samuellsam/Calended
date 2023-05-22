const CalendedSubmitButton: React.FC<{
  value: string;
}> = (props) => {
  return (
    <input
      type="submit"
      value={props.value}
      className="w-full rounded-lg p-2 shadow-md calended-input-text mb-2 cursor-pointer bg-sky-500 hover:bg-sky-400 text-slate-100 font-bold mt-4"
    />
  );
};

export default CalendedSubmitButton;
