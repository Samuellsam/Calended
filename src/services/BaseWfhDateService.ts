import { BaseDate } from "@/interfaces/BaseDateModel";
import { HOLIDAY_DATE_FORMAT } from "./HolidayService";
import moment from "moment";
import { getTeamByName } from "./TeamService";
import { Team } from "@/interfaces/Team";
import axios from "axios";

const baseWfhDate = {
  date: moment("02-01-2023", HOLIDAY_DATE_FORMAT),
  wfhTeam: getTeamByName("C") as Team,
};

export const getBaseWfhDate = async () => {
  return {
    date: moment("02-01-2023", HOLIDAY_DATE_FORMAT),
    wfhTeam: getTeamByName("C") as Team,
  };
};
