import { BaseDate } from "@/interfaces/BaseDateModel";
import { Team } from "@/interfaces/Team.js";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

const BaseDateListItem: React.FC<{
  baseDate: BaseDate;
}> = (props) => {
  const [wfhTeam, setWfhTeam] = useState<Team>();

  useEffect(() => {
    fetchTeam();
  });

  const fetchTeam = async () => {
    try {
      const response = await axios.get("/api/team/get-all");
      setWfhTeam(
        response.data.data.teams.filter(
          (team: Team) => team.id === props.baseDate.wfhTeamId
        )[0]
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-md bg-slate-100 py-1 px-2 my-2">
      <div className="flex flex-col">
        <p className="text-md">{`Base date ${moment(props.baseDate.date).format(
          "DD MMMM YYYY"
        )}`}</p>
        <div className="grid grid-cols-8">
          <p className="col-span-6 font-bold">{`Team ${wfhTeam?.name}`}</p>
          <input type="color" value={wfhTeam?.color} disabled={true} />
          <p className="text-sm my-auto">{`${wfhTeam?.color}`}</p>
        </div>
      </div>
    </div>
  );
};

export default BaseDateListItem;
