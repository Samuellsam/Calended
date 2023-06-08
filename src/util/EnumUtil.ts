import { MonthEnum } from "@/enums/MonthEnum";

export const getMonthEnumKeyByValue = (value: string) => {
  return Object.keys(MonthEnum)[
    Object.values(MonthEnum).indexOf(value as MonthEnum)
  ];
};
