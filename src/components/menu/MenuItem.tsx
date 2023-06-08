const MenuItem: React.FC<{
  name: string;
  onClick?: () => void;
}> = (props) => {
  return (
    <div
      className="relative mx-auto menu-item bg-slate-500 hover:bg-slate-400 text-slate-100 cursor-pointer shadow-md rounded-lg"
      onClick={props.onClick}
    >
      <div className="flex grow"></div>
      <p className="menu-item-text absolute font-bold left-1/2 transform -translate-x-1/2 bottom-3 text-center menu-text text-slate-100">
        {props.name}
      </p>
    </div>
  );
};

export default MenuItem;
