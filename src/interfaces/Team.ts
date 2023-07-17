import { UUID } from "crypto";
import { Moment } from "moment";

export interface Member {
  id: string;
  name: string;
  birthday: Moment;
}

export interface Team {
  id: string;
  name: string;
  member?: Member[];
  order: number;
  color: string;
}
