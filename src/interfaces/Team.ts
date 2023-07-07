import { Moment } from "moment";

export interface Member {
  name: string;
  birthday: Moment;
}

export interface Team {
  name: string;
  member?: Member[];
  order: number;
  color: string;
}
