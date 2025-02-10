import { Dayjs } from "dayjs";

import dayjsUtil from "./dayjsUtil";

export type PrizeTimes = {
  timeUntil1Month: number;
  timeUntil6Months: number;
  timeUntil1Year: number;
};

export default function timeUntilNextPrize(date: Dayjs): PrizeTimes {
  const now = dayjsUtil();

  const oneMonth = date.add(1, "month");
  const sixMonths = date.add(6, "month");
  const oneYear = date.add(1, "year");

  return {
    timeUntil1Month: now.isAfter(oneMonth) ? 0 : oneMonth.diff(now, "day"),
    timeUntil6Months: now.isAfter(sixMonths) ? 0 : sixMonths.diff(now, "day"),
    timeUntil1Year: now.isAfter(oneYear) ? 0 : oneYear.diff(now, "day"),
  };
}
