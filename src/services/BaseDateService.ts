import { BaseDate } from "@/interfaces/BaseDateModel";
import { HOLIDAY_DATE_FORMAT } from "./HolidayService";
import moment from "moment";
import { Team } from "@/interfaces/Team";
import axios from "axios";

export const getBaseDate = async () => {
  const getBaseDateResponse = await axios.get("/api/base-date/get-all");
  const baseDate: BaseDate = getBaseDateResponse.data.data.baseDate;

  const getTeamResponse = await axios.get("/api/team/get-all");
  const teams: Team[] = getTeamResponse.data.data.teams;

  return {
    date: moment(baseDate.date, HOLIDAY_DATE_FORMAT),
    wfhTeam: teams.find((t) => t.id === baseDate.wfhTeamId),
  };
};
