"use server";

import {
  ApiResponse,
  ClientUser,
  EnrollmentForm,
  FagerstromTest,
  User,
} from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

import { handleEmailVerificationTokenRequest } from "../email-verification-tokens/public-mutations";
import { createFagerstromTest } from "../fagerstrom-tests/private-mutations";
import { createProgramEnrollmentsFromEnrollmentForm } from "../program-enrollments/private-mutations";
import { createClientUser } from "../users/private-mutations";
import { createEnrollmentForm } from "./private-mutations";

export async function handleEnrollmentFormSubmission(
  enrollmentForm: EnrollmentForm,
): Promise<ApiResponse<null>> {
  // create enrollment form
  const [enrollmentFormInDatabase, createEnrollmentFormError] =
    await createEnrollmentForm(enrollmentForm);

  if (createEnrollmentFormError !== null) {
    return [null, createEnrollmentFormError];
  }

  const user: ClientUser = {
    firstName: enrollmentForm.generalInformationSection.firstName,
    lastName: enrollmentForm.generalInformationSection.lastName,
    email: enrollmentForm.generalInformationSection.email,
    phoneNumber: enrollmentForm.generalInformationSection.phoneNumber,
    password: enrollmentForm.generalInformationSection.password,
    role: "client",
    dateCreated: new Date().toISOString(),
    isEmailVerified: false,
    enrollmentForm: enrollmentFormInDatabase,
    programEnrollments: [],
    healthyHabitsTrackingForms: [],
    fagerstromTests: [],
  };

  // create user
  const [userInDatabase, createUserError] = await createClientUser(user);

  if (createUserError !== null) {
    return [null, createUserError];
  }

  // send email verification email
  await handleEmailVerificationTokenRequest(
    enrollmentFormInDatabase.generalInformationSection.email,
  );

  // create program enrollments
  await createProgramEnrollmentsFromEnrollmentForm(
    enrollmentFormInDatabase,
    userInDatabase,
  );

  // add fagerstrom test
  await createFagerstromTestsFromEnrollmentForm(
    enrollmentFormInDatabase,
    userInDatabase,
  );

  return [null, null];
}

async function createFagerstromTestsFromEnrollmentForm(
  enrollmentForm: EnrollmentForm,
  user: User,
): Promise<void> {
  const isEnrolledInRigsWithoutCigs =
    enrollmentForm.programSelectionSection.optedInToRigsWithoutCigs;

  if (!isEnrolledInRigsWithoutCigs) {
    return;
  }

  const rigsWithoutCigs =
    enrollmentForm.programSpecificQuestionsSection.rigsWithoutCigs;

  const fagerstromTest: FagerstromTest = {
    client: user,
    submittedDate: dayjsUtil().utc().toISOString(),

    cigaretteFagerstromScore: rigsWithoutCigs.cigaretteFagerstromScore,
    firstSmokeTime: rigsWithoutCigs.firstSmokeTime,
    isDifficultToNotSmokeInForbiddenAreas:
      rigsWithoutCigs.isDifficultToNotSmokeInForbiddenAreas,
    cigaretteHateToGiveUp: rigsWithoutCigs.cigaretteHateToGiveUp,
    cigarettesPerDay: rigsWithoutCigs.cigarettesPerDay,
    smokeMoreInMorning: rigsWithoutCigs.smokeMoreInMorning,
    smokeWhenIll: rigsWithoutCigs.smokeWhenIll,

    tobaccoFagerstromScore: rigsWithoutCigs.tobaccoFagerstromScore,
    firstTobaccoTime: rigsWithoutCigs.firstTobaccoTime,
    swallowTobaccoJuice: rigsWithoutCigs.swallowTobaccoJuice,
    tobaccoHateToGiveUp: rigsWithoutCigs.tobaccoHateToGiveUp,
    tobaccoCansPerWeek: rigsWithoutCigs.tobaccoCansPerWeek,
    tobaccoChewMoreAfterAwakening:
      rigsWithoutCigs.tobaccoChewMoreAfterAwakening,
    tobaccoChewWhenIll: rigsWithoutCigs.tobaccoChewWhenIll,
  };

  await createFagerstromTest(fagerstromTest);
}
