import { HolidayEnum } from "@/enums/HolidayEnum.js";
import { Moment } from "moment";

export interface Holiday {
  name: string;
  from: Moment;
  to: Moment;
  type: HolidayEnum;
}
