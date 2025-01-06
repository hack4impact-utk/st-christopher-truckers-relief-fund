"use server";

import { handleEmailVerificationTokenRequest } from "@/server/api/email-verification-tokens/public-mutations";
import { createEnrollmentForm } from "@/server/api/enrollment-forms/private-mutations";
import { createProgramEnrollmentsFromEnrollmentForm } from "@/server/api/program-enrollments/private-mutations";
import { createClientUser } from "@/server/api/users/private-mutations";
import { ApiResponse, ClientUser, EnrollmentForm } from "@/types";

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
