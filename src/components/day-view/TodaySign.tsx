const TodaySign: React.FC<{}> = () => {
  return (
    <>
      <div className="absolute rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-slate-100 today-sign z-10">
        <p className="absolute text-sm px-2 font-extrabold today-text bg-slate-100 rounded-md m-1">
          TODAY
        </p>
      </div>
    </>
  );
};

export default TodaySign;
