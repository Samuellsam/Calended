import { MenuEnum } from "@/enums/MenuEnum";
import MenuItem from "./MenuItem";

const MainMenu: React.FC<{
  onMenuSelect: (menu: MenuEnum) => void;
}> = (props) => {
  return (
    <>
      <div className="grid grid-cols-3">
        <MenuItem
          name="TEAM's"
          onClick={() => props.onMenuSelect(MenuEnum.TEAM)}
        />
        <MenuItem
          name="OFF DAY's"
          onClick={() => props.onMenuSelect(MenuEnum.OFF_DAY)}
        />
        <MenuItem
          name="MEMBER's"
          onClick={() => props.onMenuSelect(MenuEnum.MEMBER)}
        />
        <MenuItem
          name="BASE DATE"
          onClick={() => props.onMenuSelect(MenuEnum.BASE_DATE)}
        />
        <MenuItem
          name="BIRTHDAY's"
          onClick={() => props.onMenuSelect(MenuEnum.BIRTHDAY)}
        />
        <MenuItem
          name="EXPORT"
          onClick={() => props.onMenuSelect(MenuEnum.EXPORT)}
        />
      </div>
    </>
  );
};

export default MainMenu;
