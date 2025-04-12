import { ClientUser, ScreeningRequest } from "@/types";
import calculateAge from "@/utils/calculateAge";
import dayjsUtil from "@/utils/dayjsUtil";

function isCompletedScreeningRequest(
  screeningRequest: ScreeningRequest,
): boolean {
  return (
    screeningRequest.status === "initial positive" ||
    screeningRequest.status === "true positive" ||
    screeningRequest.status === "false positive" ||
    screeningRequest.status === "rejected"
  );
}

export function isEligibleForProstateScreening(
  user: ClientUser,
  screeningRequests: ScreeningRequest[],
): boolean {
  if (user.enrollmentForm.generalInformationSection.sex === "female") {
    return false;
  }

  const age = calculateAge(user.dateOfBirth);

  if (age <= 50 || age >= 65) {
    return false;
  }

  const mostRecentProstateScreeningRequest = screeningRequests.find(
    (screeningRequest) => screeningRequest.name === "Prostate Screening",
  );

  if (!mostRecentProstateScreeningRequest) {
    return true;
  }

  if (isCompletedScreeningRequest(mostRecentProstateScreeningRequest)) {
    const twoYearsAfterMostRecentProstateScreening = dayjsUtil(
      mostRecentProstateScreeningRequest.submittedDate,
    ).add(2, "year");

    return dayjsUtil().isAfter(twoYearsAfterMostRecentProstateScreening);
  }

  return false;
}

export function isEligibleForColorectalScreening(
  user: ClientUser,
  screeningRequests: ScreeningRequest[],
): boolean {
  const age = calculateAge(user.dateOfBirth);

  if (age <= 45 || age >= 75) {
    return false;
  }

  const mostRecentColorectalScreeningRequest = screeningRequests.find(
    (screeningRequest) =>
      screeningRequest.name === "Colon / Colorectal Screening",
  );

  if (!mostRecentColorectalScreeningRequest) {
    return true;
  }

  if (isCompletedScreeningRequest(mostRecentColorectalScreeningRequest)) {
    const oneYearAfterMostRecentColorectalScreening = dayjsUtil(
      mostRecentColorectalScreeningRequest.submittedDate,
    ).add(1, "year");

    return dayjsUtil().isAfter(oneYearAfterMostRecentColorectalScreening);
  }

  return false;
}

export function isEligibleForCervicalScreening(
  user: ClientUser,
  screeningRequests: ScreeningRequest[],
): boolean {
  if (user.enrollmentForm.generalInformationSection.sex === "male") {
    return false;
  }

  const age = calculateAge(user.dateOfBirth);

  if (age <= 21 || age >= 65) {
    return false;
  }

  const mostRecentCervicalScreeningRequest = screeningRequests.find(
    (screeningRequest) => screeningRequest.name === "Cervical Cancer Screening",
  );

  if (!mostRecentCervicalScreeningRequest) {
    return true;
  }

  if (isCompletedScreeningRequest(mostRecentCervicalScreeningRequest)) {
    const oneYearAfterMostRecentColorectalScreening = dayjsUtil(
      mostRecentCervicalScreeningRequest.submittedDate,
    ).add(1, "year");

    return dayjsUtil().isAfter(oneYearAfterMostRecentColorectalScreening);
  }

  return false;
}
