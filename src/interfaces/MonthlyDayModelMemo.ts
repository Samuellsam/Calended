import { DayModel } from "@/components/Calendar";
import { MonthEnum } from "@/enums/MonthEnum";

export interface MonthlyDayModelMemo {
  [MonthEnum.JANUARY]?: DayModel[];
  [MonthEnum.FEBRUARY]?: DayModel[];
  [MonthEnum.MARCH]?: DayModel[];
  [MonthEnum.APRIL]?: DayModel[];
  [MonthEnum.MAY]?: DayModel[];
  [MonthEnum.JUNE]?: DayModel[];
  [MonthEnum.JULY]?: DayModel[];
  [MonthEnum.AUGUST]?: DayModel[];
  [MonthEnum.SEPTEMBER]?: DayModel[];
  [MonthEnum.OCTOBER]?: DayModel[];
  [MonthEnum.NOVEMBER]?: DayModel[];
  [MonthEnum.DECEMBER]?: DayModel[];
}
