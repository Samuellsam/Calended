import { Team } from "@/interfaces/Team";
import { getWfoTeam } from "@/services/TeamService";
import axios from "axios";
import { useEffect, useState } from "react";

const WfoCover: React.FC<{
  wfhTeam: Team;
}> = (props) => {
  const [wfoTeam, setWfoTeam] = useState<string>("");
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get("/api/team/get-all");
      setTeams(response.data.data.teams);
    } catch (error) {
      console.log(error);
    }

    return [];
  };

  useEffect(() => {
    (async () => {
      setWfoTeam(getWfoTeam(teams, props.wfhTeam));
    })();
  });

  return (
    <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-[800] text-slate-950 wfo-text">
      {wfoTeam}
    </p>
  );
};

export default WfoCover;
