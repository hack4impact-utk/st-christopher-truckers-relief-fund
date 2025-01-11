import dayjsUtil from "./dayjsUtil";

export default function getClosestPastSunday() {
  const today = dayjsUtil();

  const dayOfWeek = today.day();
  if (dayOfWeek === 0) {
    return today.format("MM/DD/YYYY");
  }

  const closestSunday = today.subtract(dayOfWeek, "day");

  return closestSunday.format("MM/DD/YYYY");
}
