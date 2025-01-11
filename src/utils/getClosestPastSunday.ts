import { Dayjs } from "dayjs";

import dayjsUtil from "./dayjsUtil";

/**
 * @param date The date to get the closest past sunday for. Defaults to the current date.
 * @returns The closest past sunday to the current date in ISO date format
 */
export default function getClosestPastSunday(date?: Dayjs) {
  const today = dayjsUtil(date).utc().startOf("day");

  const dayOfWeek = today.day();
  if (dayOfWeek === 0) {
    return today.toISOString();
  }

  const closestSunday = today.subtract(dayOfWeek, "day");

  return closestSunday.toISOString();
}
