import dayjsUtil from "@/utils/dayjsUtil";

export default function calculateAge(dateString: string) {
  const birthDate = dayjsUtil(dateString, "DD/MM/YYYY");

  const today = dayjsUtil();

  return today.diff(birthDate, "year");
}
