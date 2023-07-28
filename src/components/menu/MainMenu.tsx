import { MenuEnum } from "@/enums/MenuEnum";
import MenuItem from "./MenuItem";

const MainMenu: React.FC<{
  onMenuSelect: (menu: MenuEnum) => void;
}> = (props) => {
  return (
    <>
      <div className="grid grid-cols-3">
        <MenuItem
          name="Team"
          onClick={() => props.onMenuSelect(MenuEnum.TEAM)}
        />
        <MenuItem
          name="Off Day"
          onClick={() => props.onMenuSelect(MenuEnum.OFF_DAY)}
        />
        <MenuItem
          name="Member"
          onClick={() => props.onMenuSelect(MenuEnum.MEMBER)}
        />
        <MenuItem
          name="Base Date"
          onClick={() => props.onMenuSelect(MenuEnum.BASE_DATE)}
        />
      </div>
    </>
  );
};

export default MainMenu;
