import { BaseWfhDateModel } from "@/interfaces/BaseWfhDateModel";
import { HOLIDAY_DATE_FORMAT } from "./HolidayService";
import moment from "moment";

const baseWfhDate: BaseWfhDateModel = {
  date: moment("02-01-2023", HOLIDAY_DATE_FORMAT),
  wfhTeam: {
    value: "C",
    order: 2,
    color: "orange",
  },
};

export const getBaseWfhDate = () => baseWfhDate;
