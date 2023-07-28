import { MenuEnum } from "@/enums/MenuEnum";
import MenuItem from "./MenuItem";
import {
  faBook,
  faCalendarTimes,
  faPeopleGroup,
  faPeopleRobbery,
} from "@fortawesome/free-solid-svg-icons";

const MainMenu: React.FC<{
  onMenuSelect: (menu: MenuEnum) => void;
}> = (props) => {
  return (
    <>
      <div className="grid grid-cols-3">
        <MenuItem
          icon={faPeopleGroup}
          name="Team"
          onClick={() => props.onMenuSelect(MenuEnum.TEAM)}
        ></MenuItem>
        <MenuItem
          name="Off Day"
          icon={faCalendarTimes}
          onClick={() => props.onMenuSelect(MenuEnum.OFF_DAY)}
        ></MenuItem>
        <MenuItem
          name="Member"
          icon={faPeopleRobbery}
          onClick={() => props.onMenuSelect(MenuEnum.MEMBER)}
        ></MenuItem>
        <MenuItem
          name="Base Date"
          onClick={() => props.onMenuSelect(MenuEnum.BASE_DATE)}
          icon={faBook}
        ></MenuItem>
      </div>
    </>
  );
};

export default MainMenu;
