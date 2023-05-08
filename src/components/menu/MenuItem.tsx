const MenuItem: React.FC<{
  name: string;
}> = (props) => {
  return (
    <div className="relative mx-auto menu-item bg-slate-200 hover:bg-slate-400 hover:text-slate-100 cursor-pointer shadow-md rounded-lg">
      <div className="flex grow"></div>
      <p className="absolute font-bold left-1/2 transform -translate-x-1/2 bottom-5 text-center menu-text">
        {props.name}
      </p>
    </div>
  );
};

export default MenuItem;
