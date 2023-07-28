import { HolidayEnum } from "@/enums/HolidayEnum";
import { OffDay } from "@/interfaces/Holiday";
import moment, { Moment } from "moment";

export const HOLIDAY_DATE_FORMAT = "DD-MM-YYYY";

const holidays: OffDay[] = [
  {
    from: moment("01-01-2023", HOLIDAY_DATE_FORMAT),
    to: moment("01-01-2023", HOLIDAY_DATE_FORMAT),
    name: "Tahun Baru 2023 Masehi",
    type: HolidayEnum.HOLIDAY,
  },
  {
    from: moment("22-01-2023", HOLIDAY_DATE_FORMAT),
    to: moment("22-01-2023", HOLIDAY_DATE_FORMAT),
    name: "Tahun Baru Imlek 2574 Kongzili",
    type: HolidayEnum.HOLIDAY,
  },
  {
    from: moment("18-02-2023", HOLIDAY_DATE_FORMAT),
    to: moment("18-02-2023", HOLIDAY_DATE_FORMAT),
    name: "Isra Mikraj Nabi Muhammad SAW",
    type: HolidayEnum.HOLIDAY,
  },
  {
    from: moment("22-03-2023", HOLIDAY_DATE_FORMAT),
    to: moment("22-03-2023", HOLIDAY_DATE_FORMAT),
    name: "Hari Suci Nyepi Tahun Baru Saka 1945",
    type: HolidayEnum.HOLIDAY,
  },
  {
    from: moment("07-04-2023", HOLIDAY_DATE_FORMAT),
    to: moment("07-04-2023", HOLIDAY_DATE_FORMAT),
    name: "Wafat Isa Al Masih",
    type: HolidayEnum.HOLIDAY,
  },
  {
    from: moment("22-04-2023", HOLIDAY_DATE_FORMAT),
    to: moment("23-04-2023", HOLIDAY_DATE_FORMAT),
    name: "Hari Raya Idul Fitri 1444 Hijriah",
    type: HolidayEnum.HOLIDAY,
  },
  {
    from: moment("01-05-2023", HOLIDAY_DATE_FORMAT),
    to: moment("01-05-2023", HOLIDAY_DATE_FORMAT),
    name: "Hari Buruh Internasional",
    type: HolidayEnum.HOLIDAY,
  },
  {
    from: moment("18-05-2023", HOLIDAY_DATE_FORMAT),
    to: moment("18-05-2023", HOLIDAY_DATE_FORMAT),
    name: "Kenaikan Isa Al Masih",
    type: HolidayEnum.HOLIDAY,
  },
  {
    from: moment("01-06-2023", HOLIDAY_DATE_FORMAT),
    to: moment("01-06-2023", HOLIDAY_DATE_FORMAT),
    name: "Hari Lahir Pancasila",
    type: HolidayEnum.HOLIDAY,
  },
  {
    from: moment("04-06-2023", HOLIDAY_DATE_FORMAT),
    to: moment("04-06-2023", HOLIDAY_DATE_FORMAT),
    name: "Hari Raya Waisak 2567 BE",
    type: HolidayEnum.HOLIDAY,
  },
  {
    from: moment("28-06-2023", HOLIDAY_DATE_FORMAT),
    to: moment("30-06-2023", HOLIDAY_DATE_FORMAT),
    name: "Hari Raya Idul Adha 1444 Hijriah",
    type: HolidayEnum.HOLIDAY,
  },
  {
    from: moment("19-07-2023", HOLIDAY_DATE_FORMAT),
    to: moment("19-07-2023", HOLIDAY_DATE_FORMAT),
    name: "Tahun Baru Islam 14445 Hijriah",
    type: HolidayEnum.HOLIDAY,
  },
  {
    from: moment("17-08-2023", HOLIDAY_DATE_FORMAT),
    to: moment("17-08-2023", HOLIDAY_DATE_FORMAT),
    name: "Hari Kemerdekaan Republik Indonesia",
    type: HolidayEnum.HOLIDAY,
  },
  {
    from: moment("28-09-2023", HOLIDAY_DATE_FORMAT),
    to: moment("28-09-2023", HOLIDAY_DATE_FORMAT),
    name: "Maulid Nabi Muhammad SAW",
    type: HolidayEnum.HOLIDAY,
  },
  {
    from: moment("25-12-2023", HOLIDAY_DATE_FORMAT),
    to: moment("25-12-2023", HOLIDAY_DATE_FORMAT),
    name: "Hari Raya Natal",
    type: HolidayEnum.HOLIDAY,
  },
  {
    from: moment("23-01-2023", HOLIDAY_DATE_FORMAT),
    to: moment("23-01-2023", HOLIDAY_DATE_FORMAT),
    name: "Tahun Baru Imlek 2574 Kongzili",
    type: HolidayEnum.MASS_LEAVE,
  },
  {
    from: moment("23-03-2023", HOLIDAY_DATE_FORMAT),
    to: moment("23-03-2023", HOLIDAY_DATE_FORMAT),
    name: "Hari Suci Nyepi Tahun Baru Saka 1945",
    type: HolidayEnum.MASS_LEAVE,
  },
  {
    from: moment("19-04-2023", HOLIDAY_DATE_FORMAT),
    to: moment("25-04-2023", HOLIDAY_DATE_FORMAT),
    name: "Hari Raya Idul Fitri 1444 Hijriah",
    type: HolidayEnum.MASS_LEAVE,
  },
  {
    from: moment("02-06-2023", HOLIDAY_DATE_FORMAT),
    to: moment("02-06-2023", HOLIDAY_DATE_FORMAT),
    name: "Hari Raya Waisak",
    type: HolidayEnum.MASS_LEAVE,
  },
  {
    from: moment("26-12-2023", HOLIDAY_DATE_FORMAT),
    to: moment("26-12-2023", HOLIDAY_DATE_FORMAT),
    name: "Hari Raya Natal",
    type: HolidayEnum.MASS_LEAVE,
  },
];

export const save = (holidays: OffDay[]) => {
  // saveToFile(`../../data/HOLIDAY-DATA.txt`, JSON.stringify(holidays));
};

export const getAllHolidays = (): OffDay[] => {
  return holidays;
};

export const getHolidaysByDate = (date: Moment) => {
  return holidays.filter((holiday) =>
    date.isBetween(holiday.from, holiday.to, "days", "[]")
  );
};

export const isHoliday = (date: Moment): boolean => {
  return (
    holidays.filter((holiday) =>
      date.isBetween(holiday.from, holiday.to, "days", "[]")
    ).length > 0
  );
};

export const isWorkDay = (date: Moment): boolean => {
  return date.get("day") > 0 && date.get("day") < 6;
};
