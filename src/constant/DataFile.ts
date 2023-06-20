import path from "path";

const CURR_WORK_DIR = process.cwd();

export const HOLIDAY_DATA_PATH = path.join(
  CURR_WORK_DIR,
  "data/HOLIDAY_DATA.json"
);

export const TEAM_DATA_PATH = path.join(
  CURR_WORK_DIR,
  "data/TEAM_DATA.json"
);
