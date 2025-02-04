import dayjsUtil from "./dayjsUtil";

export default function calculateAge(dateString: string): number {
  const birthDate = dayjsUtil(dateString, "DD/MM/YYYY");

  const today = dayjsUtil();

  return today.diff(birthDate, "year");
}
