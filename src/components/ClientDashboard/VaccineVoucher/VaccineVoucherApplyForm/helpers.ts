import { VaccineName, VaccineVoucherRequest } from "@/types";

import dayjsUtil from "../../../../utils/dayjsUtil";

export const getLastVaccineVoucherRequest = (
  vaccineVoucherRequests: VaccineVoucherRequest[],
  vaccineName: VaccineName,
): VaccineVoucherRequest | undefined => {
  return vaccineVoucherRequests.find(
    (vaccineVoucherRequest) =>
      vaccineVoucherRequest.vaccineName === vaccineName,
  );
};

export const lastRequestWasOverTenMonthsAgo = (
  previousRequest?: VaccineVoucherRequest,
): boolean => {
  if (!previousRequest) {
    return true;
  }

  const previousRequestDate = dayjsUtil.utc(previousRequest.submittedDate);

  const tenMonthsAgo = dayjsUtil().utc().subtract(10, "month");

  return previousRequestDate.isBefore(tenMonthsAgo);
};

export function shouldShowFluVaccine(
  previousFluRequest?: VaccineVoucherRequest,
): boolean {
  // Check for flu season
  const currentDate = dayjsUtil().utc();
  const month = currentDate.month() + 1;
  const isFluSeason = month >= 9 && month <= 3;

  if (!isFluSeason) {
    return false;
  }

  return lastRequestWasOverTenMonthsAgo(previousFluRequest);
}

export function shouldShowPneumoniaVaccine(
  previousPneumoniaRequest?: VaccineVoucherRequest,
): boolean {
  return lastRequestWasOverTenMonthsAgo(previousPneumoniaRequest);
}

export function shouldShowShinglesVaccine(
  previousShinglesRequest?: VaccineVoucherRequest,
): boolean {
  return lastRequestWasOverTenMonthsAgo(previousShinglesRequest);
}

export function shouldShowShinglesBoosterVaccine(
  previousShinglesBoosterRequest?: VaccineVoucherRequest,
): boolean {
  return lastRequestWasOverTenMonthsAgo(previousShinglesBoosterRequest);
}

export const fieldNameToVaccineName = (fieldName: string): VaccineName => {
  switch (fieldName) {
    case "wantsFluVaccine":
      return "Flu";
    case "wantsPneumoniaVaccine":
      return "Pneumonia";
    case "wantsShinglesVaccine":
      return "Shingles";
    case "wantsShinglesBoosterVaccine":
      return "Shingles Booster";
    default:
      throw new Error("Invalid field name");
  }
};
