import { Team } from "@/interfaces/Team";
import { Teams } from "@/services/TeamService";

const TeamListItem: React.FC<{
  team: Team;
}> = (props) => {
  return (
    <div className="rounded-md bg-slate-100 py-1 px-2 my-2">
      <div className="flex flex-col">
        <p className="font-bold">{`#${props.team.order}`}</p>
        <div className="grid grid-cols-8">
          <p className="col-span-6">{`Team ${props.team.name} (${props.team.member?.length} member's)`}</p>
          <input type="color" value={props.team.color} disabled={true} />
          <p className="text-sm my-auto">{`${props.team.color}`}</p>
        </div>
      </div>
    </div>
  );
};

const TeamListView: React.FC<{}> = () => {
  return (
    <div
      className="overflow-y-auto"
      style={{
        height: "300px",
      }}
    >
      {Teams.map((t) => (
        <TeamListItem team={t} key={t.order} />
      ))}
    </div>
  );
};

export default TeamListView;
