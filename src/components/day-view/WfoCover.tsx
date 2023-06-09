import { Team } from "@/interfaces/Team";
import { getWfoTeam } from "@/services/TeamService";

const WfoCover: React.FC<{
  wfhTeam: Team;
}> = (props) => {
  return (
    <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-[800] text-slate-950 wfo-text">
      {getWfoTeam(props.wfhTeam)}
    </p>
  );
};

export default WfoCover;
