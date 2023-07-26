import { Team } from "@/interfaces/Team";
import { getWfoTeam } from "@/services/TeamService";
import { useEffect, useState } from "react";

const WfoCover: React.FC<{
  wfhTeam: Team;
}> = (props) => {
  const [wfoTeam, setWfoTeam] = useState<string>("");

  useEffect(() => {
    (async () => {
      setWfoTeam(await getWfoTeam(props.wfhTeam));
    })();
  });

  return (
    <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-[800] text-slate-950 wfo-text">
      {wfoTeam}
    </p>
  );
};

export default WfoCover;
