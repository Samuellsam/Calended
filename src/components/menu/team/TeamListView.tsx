import { Team } from "@/interfaces/Team";
import { Teams } from "@/services/TeamService";

const TeamListItem: React.FC<{
  team: Team;
}> = (props) => {
  return (
    <div className="rounded-md bg-slate-100 p-2 my-2">
      <div className="grid grid-rows-3">
        <p className="font-bold">{`#${props.team.order}`}</p>
        <p>{`Team ${props.team.name} (${props.team.member?.length} member's)`}</p>
        <div className="flex justify-end">
          <input type="color" value={props.team.color} disabled={true} />
          &nbsp;
          <p>{`${props.team.color}`}</p>
        </div>
      </div>
    </div>
  );
};

const TeamListView: React.FC<{}> = () => {
  return (
    <div className="overflow-y-auto">
      {Teams.map((t) => (
        <TeamListItem team={t} key={t.order} />
      ))}
    </div>
  );
};

export default TeamListView;
