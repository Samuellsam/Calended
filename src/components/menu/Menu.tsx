import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { MenuEnum } from "@/enums/MenuEnum";
import MainMenu from "./MainMenu";
import TeamMenu from "./TeamMenu";
import OffDayMenu from "./OffDayMenu";
import MemberMenu from "./MemberMenu";
import BaseDateMenu from "./BaseDateMenu";
import ExportMenu from "./ExportMenu";

const Menu: React.FC<{}> = () => {
  const [isShowed, setIsShowed] = useState<boolean>(false);
  const [currMenu, setCurrMenu] = useState<MenuEnum>(MenuEnum.OFF_DAY);

  const getMenuClassName = () => {
    const defaultClassName =
      "fixed top-0 right-0 flex bg-slate-100 menu-container shadow-lg";

    if (isShowed) return defaultClassName + " menu-show";

    return defaultClassName + " menu-hide";
  };

  const closeMenu = () => setIsShowed(false);

  const openMenu = () => setIsShowed(true);

  const renderMenu = () => {
    if (currMenu == MenuEnum.MAIN_MENU) return <MainMenu />;
    if (currMenu == MenuEnum.TEAM) return <TeamMenu />;
    if (currMenu == MenuEnum.OFF_DAY) return <OffDayMenu />;
    if (currMenu == MenuEnum.MEMBER) return <MemberMenu />;
    if (currMenu == MenuEnum.BASE_DATE) return <BaseDateMenu />;
    if (currMenu == MenuEnum.EXPORT) return <ExportMenu />;

    return <></>;
  };

  return (
    <>
      {isShowed ? (
        <div className={getMenuClassName()}>
          <FontAwesomeIcon
            icon={faXmark}
            className="fixed top-7 right-7 hover:text-slate-400 cursor-pointer"
            size="xl"
            onClick={() => closeMenu()}
          />
          <div className="my-auto">{renderMenu()}</div>
        </div>
      ) : (
        <FontAwesomeIcon
          icon={faBars}
          className="fixed top-7 right-7 text-slate-100 hover:text-slate-400 cursor-pointer"
          size="xl"
          onClick={() => openMenu()}
        />
      )}
    </>
  );
};

export default Menu;
