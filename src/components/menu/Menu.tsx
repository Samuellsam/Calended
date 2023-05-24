import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faBars,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { MenuEnum } from "@/enums/MenuEnum";
import MainMenu from "./MainMenu";
import TeamMenu from "./TeamMenu";
import OffDayMenu from "./OffDayMenu";
import MemberMenu from "./MemberMenu";
import BaseDateMenu from "./BaseDateMenu";
import ExportMenu from "./ExportMenu";
import BirthDayMenu from "./BirthdayMenu";
import { log } from "console";

const Menu: React.FC<{}> = () => {
  const [isShowed, setIsShowed] = useState<boolean>(false);
  const [currMenu, setCurrMenu] = useState<MenuEnum>(MenuEnum.MAIN_MENU);
  const [menuStack, setMenuStack] = useState<MenuEnum[]>([]);

  const getMenuClassName = () => {
    const defaultClassName =
      "fixed top-0 right-0 flex bg-slate-800 menu-container";

    if (isShowed) return defaultClassName + " menu-show";

    return defaultClassName + " menu-hide";
  };

  const closeMenu = () => {
    setIsShowed(false);
  };

  const openMenu = () => {
    setIsShowed(true);
  };

  const backMenu = () => {
    menuStack.pop();

    setCurrMenu(menuStack[menuStack.length - 1] ?? MenuEnum.MAIN_MENU);
    setMenuStack(menuStack);
  };

  const changeMenu = (menu: MenuEnum) => {
    menuStack.push(menu);

    setCurrMenu(menu);
    setMenuStack(menuStack);
  };

  const renderMenu = () => {
    if (currMenu == MenuEnum.MAIN_MENU)
      return <MainMenu onMenuSelect={(menu) => changeMenu(menu)} />;
    if (currMenu == MenuEnum.TEAM) return <TeamMenu onBack={backMenu} />;
    if (currMenu == MenuEnum.OFF_DAY) return <OffDayMenu onBack={backMenu} />;
    if (currMenu == MenuEnum.MEMBER) return <MemberMenu onBack={backMenu} />;
    if (currMenu == MenuEnum.BASE_DATE)
      return <BaseDateMenu onBack={backMenu} />;
    if (currMenu == MenuEnum.BIRTHDAY)
      return <BirthDayMenu onBack={backMenu} />;
    if (currMenu == MenuEnum.EXPORT) return <ExportMenu onBack={backMenu} />;

    return <></>;
  };

  return (
    <>
      {isShowed ? (
        <div className={getMenuClassName()}>
          {currMenu !== MenuEnum.MAIN_MENU && (
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="ml-1 text-slate-100 cursor-pointer"
              size="xl"
              onClick={() => backMenu()}
            />
          )}
          <FontAwesomeIcon
            icon={faXmark}
            className="fixed right-7 text-slate-100 cursor-pointer"
            size="xl"
            onClick={() => closeMenu()}
          />
          <div className="my-auto mt-10 p-2 rounded-lg">{renderMenu()}</div>
        </div>
      ) : (
        <FontAwesomeIcon
          icon={faBars}
          className="fixed top-5 right-7 text-slate-100 hover:text-slate-100 cursor-pointer"
          size="xl"
          onClick={() => openMenu()}
        />
      )}
    </>
  );
};

export default Menu;
