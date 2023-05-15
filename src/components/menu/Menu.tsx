import MenuItem from "./MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Menu: React.FC<{}> = () => {
  const [isShowed, setIsShowed] = useState<boolean>(false);

  const getMenuClassName = () => {
    const defaultClassName =
      "fixed top-0 right-0 flex bg-slate-100 menu-container shadow-lg";

    if (isShowed) return defaultClassName + " menu-show";

    return defaultClassName + " menu-hide";
  };

  const closeMenu = () => setIsShowed(false);

  const openMenu = () => setIsShowed(true);

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
          <div className="my-auto">
            <p className="text-2xl font-bold mx-auto w-max my-3">-MAIN MENU-</p>
            <div className="grid grid-cols-3">
              <MenuItem name="TEAM's" />
              <MenuItem name="OFF DAY's" />
              <MenuItem name="MEMBER's" />
              <MenuItem name="BASE DATE" />
              {/* <MenuItem name="EXPORT" /> */}
            </div>
          </div>
        </div>
      ) : (
        <FontAwesomeIcon
          icon={faBars}
          className="fixed top-7 right-7 text-slate-100 cursor-pointer"
          size="xl"
          onClick={() => openMenu()}
        />
      )}
    </>
  );
};

export default Menu;
