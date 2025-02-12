"use server";

import { ApiResponse, ClientUser, EnrollmentForm } from "@/types";

import { handleEmailVerificationTokenRequest } from "../email-verification-tokens/public-mutations";
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

  return [null, null];
}
