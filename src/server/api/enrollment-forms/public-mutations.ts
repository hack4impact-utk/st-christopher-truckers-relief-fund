"use server";

import { RigsWithoutCigsInformationFormValues } from "@/components/ClientDashboard/RigsWithoutCigsAddInfo";
import {
  ApiResponse,
  ClientUser,
  EnrollmentForm,
  FagerstromTest,
  User,
} from "@/types";
import authenticateServerFunction from "@/utils/authenticateServerFunction";
import apiErrors from "@/utils/constants/apiErrors";
import dayjsUtil from "@/utils/dayjsUtil";

import { handleEmailVerificationTokenRequest } from "../email-verification-tokens/public-mutations";
import { createFagerstromTest } from "../fagerstrom-tests/private-mutations";
import { createProgramEnrollmentsFromEnrollmentForm } from "../program-enrollments/private-mutations";
import { createClientUser } from "../users/private-mutations";
import {
  createEnrollmentForm,
  updateEnrollmentForm,
} from "./private-mutations";
import { getEnrollmentFormByEmail } from "./queries";

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
    dateOfBirth: enrollmentForm.generalInformationSection.dateOfBirth,
    email: enrollmentForm.generalInformationSection.email,
    phoneNumber: enrollmentForm.generalInformationSection.phoneNumber,
    password: enrollmentForm.generalInformationSection.password,
    role: "client",
    dateCreated: new Date().toISOString(),
    isEmailVerified: false,
    enrollmentForm: enrollmentFormInDatabase,
    programEnrollments: [],
    healthyHabitsTrackingForms: [],
    rigsWithoutCigsStatus: "unknown",
    fagerstromTests: [],
    screeningRequests: [],
    vaccineVoucherRequests: [],
    comments: "",
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

export async function handleAddRigsWithoutCigsInformation(
  data: RigsWithoutCigsInformationFormValues,
  user: User,
): Promise<ApiResponse<null>> {
  const [session, authError] = await authenticateServerFunction();

  if (authError !== null) {
    return [null, authError];
  }

  if (session.user.email !== user.email) {
    return [null, apiErrors.unauthorized];
  }

  const [enrollmentForm, enrollmentFormError] = await getEnrollmentFormByEmail(
    user.email,
  );

  if (enrollmentFormError !== null) {
    return [null, enrollmentFormError];
  }

  const updatedEnrollmentForm = {
    ...enrollmentForm,
    programSelectionSection: {
      ...enrollmentForm.programSelectionSection,
      optedInToRigsWithoutCigs: true,
    },
    programSpecificQuestionsSection: {
      ...enrollmentForm.programSpecificQuestionsSection,
      hasOptedInToRigsWithoutCigs: true,
      rigsWithoutCigs: data.rigsWithoutCigs,
    },
  };

  const [, updateError] = await updateEnrollmentForm(updatedEnrollmentForm);

  if (updateError !== null) {
    return [null, updateError];
  }

  return [null, null];
}

export async function createFagerstromTestsFromEnrollmentForm(
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

    doesUseCigarettes: rigsWithoutCigs.tobaccoForm.doesUseCigarettes,
    cigaretteFagerstromScore: rigsWithoutCigs.cigaretteFagerstromScore,
    firstSmokeTime: rigsWithoutCigs.firstSmokeTime,
    isDifficultToNotSmokeInForbiddenAreas:
      rigsWithoutCigs.isDifficultToNotSmokeInForbiddenAreas,
    cigaretteHateToGiveUp: rigsWithoutCigs.cigaretteHateToGiveUp,
    cigarettesPerDay: rigsWithoutCigs.cigarettesPerDay,
    smokeMoreInMorning: rigsWithoutCigs.smokeMoreInMorning,
    smokeWhenIll: rigsWithoutCigs.smokeWhenIll,

    doesUseSmokelessTobacco:
      rigsWithoutCigs.tobaccoForm.doesUseSmokelessTobacco,
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
