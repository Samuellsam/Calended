import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MenuItem: React.FC<{
  name: string;
  onClick?: () => void;
  icon: IconDefinition;
}> = (props) => {
  return (
    <div
      className="relative mx-auto menu-item bg-slate-100 hover:bg-slate-200 text-slate-100 cursor-pointer shadow-md rounded-lg"
      onClick={props.onClick}
    >
      <div className="flex">
        <FontAwesomeIcon
          icon={props.icon}
          size="4x"
          className="m-auto mt-4 text-slate-900"
        ></FontAwesomeIcon>
      </div>
      <p className="menu-item-text absolute font-bold left-1/2 transform -translate-x-1/2 bottom-3 text-center menu-text text-slate-900">
        {props.name}
      </p>
    </div>
  );
};

export default MenuItem;
