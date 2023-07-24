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

// VIEW MODEL

export interface MemberViewModel {
  id: string;
  name: string;
  birthday: Moment;
  teamName: string;
  teamColor: string;
}

// REQUEST

export interface SaveTeamRequestModel {
  name: string;
  color: string;
}

export interface SaveMemberRequestModel {
  name: string;
  birthday: string;
  teamId: string;
}
