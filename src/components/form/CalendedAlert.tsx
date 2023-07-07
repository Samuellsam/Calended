import {
  AlertModel,
  ERROR_ALERT,
  SUCCESS_ALERT,
  WARNING_ALERT,
} from "@/interfaces/AlertModel";
import { useEffect, useState } from "react";

const CalendedAlert: React.FC<{
  alert?: AlertModel;
}> = (props) => {
  const [currAlert, setCurrAlert] = useState<AlertModel | undefined>(
    props.alert
  );
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  useEffect(() => {
    if (props.alert) {
      setCurrAlert(props.alert);

      if (timeoutId) clearTimeout(timeoutId);

      setTimeoutId(
        setTimeout(() => {
          setCurrAlert(undefined);
        }, 2000)
      );
    } else setCurrAlert(undefined);
  }, [props.alert]);

  const getClassName = () => {
    const defaultClassName =
      "bg-slate-100 p-2 card rounded-md font-bold text-center mx-2";

    if (currAlert) {
      if (currAlert.type === SUCCESS_ALERT)
        return defaultClassName + " text-lime-300";
      if (currAlert.type === WARNING_ALERT)
        return defaultClassName + " text-yellow-300";
      if (currAlert.type === ERROR_ALERT)
        return defaultClassName + " text-red-300";
    }

    return defaultClassName + " text-slate-100";
  };

  return (
    <p className={getClassName()}>{currAlert ? currAlert.message : "_"}</p>
  );
};

export default CalendedAlert;
