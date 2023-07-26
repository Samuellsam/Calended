import { BaseDate } from "@/interfaces/BaseDateModel";
import axios from "axios";

export const getBaseDate = async () => {
  const getBaseDateResponse = await axios.get("/api/base-date/get-all");
  const baseDate: BaseDate = getBaseDateResponse.data.data.baseDate;

  return baseDate;
};
