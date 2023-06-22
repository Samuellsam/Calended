import { WfhTeamEnum } from "@/enums/WfhTeamEnum";
import { Moment } from "moment";

export interface BaseWfhDateModel {
  date: Moment;
  wfhTeam: WfhTeamEnum;
}
