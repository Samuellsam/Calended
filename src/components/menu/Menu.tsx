import MenuItem from "./MenuItem";

const Menu: React.FC<{}> = () => {
  return (
    <div className="fixed top-0 right-0 flex bg-slate-100 menu-container shadow-lg">
      <div className="my-auto">
        <p className="text-2xl font-bold mx-auto w-max my-3">-MAIN MENU-</p>
        <div className="grid grid-cols-3">
          <MenuItem name="TEAM's" />
          <MenuItem name="OFF DAY's" />
          <MenuItem name="MEMBER's" />
          <MenuItem name="BASE DATE" />
          <MenuItem name="EXPORT" />
        </div>
      </div>
    </div>
  );
};

export default Menu;
