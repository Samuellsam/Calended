import MenuItem from "./MenuItem";

const MainMenu: React.FC<{}> = () => {
  return (
    <>
      <p className="text-2xl font-bold mx-auto w-max my-3">-MAIN MENU-</p>
      <div className="grid grid-cols-3">
        <MenuItem name="TEAM's" />
        <MenuItem name="OFF DAY's" />
        <MenuItem name="MEMBER's" />
        <MenuItem name="BASE DATE" />
        {/* <MenuItem name="EXPORT" /> */}
      </div>
    </>
  );
};

export default MainMenu;
