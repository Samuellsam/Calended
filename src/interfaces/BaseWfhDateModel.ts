import { Moment } from "moment";
import { Team } from "./Team";

export interface BaseWfhDateModel {
  date: Moment;
  wfhTeam: Team;
}
