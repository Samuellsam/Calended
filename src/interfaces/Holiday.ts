import { HolidayEnum } from "@/enums/HolidayEnum";
import { Moment } from "moment";

export interface OffDay {
  id: string;
  name: string;
  from: Moment;
  to: Moment;
  type: HolidayEnum;
}
