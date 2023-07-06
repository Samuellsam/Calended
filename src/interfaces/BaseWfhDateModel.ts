import { Moment } from "moment";
import { WfhTeamModel } from "./WfhTeamModel";

export interface BaseWfhDateModel {
  date: Moment;
  wfhTeam: WfhTeamModel;
}
