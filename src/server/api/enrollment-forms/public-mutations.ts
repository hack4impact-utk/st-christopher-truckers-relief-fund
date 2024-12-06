"use server";

import { handleEmailVerificationTokenRequest } from "@/server/api/email-verification-tokens/public-mutations";
import { createEnrollmentForm } from "@/server/api/enrollment-forms/private-mutations";
import { createProgramEnrollmentsFromEnrollmentForm } from "@/server/api/program-enrollments/public-mutations";
import { createUser } from "@/server/api/users/public-mutations";
import { ApiResponse, EnrollmentForm, User } from "@/types";

export async function handleEnrollmentFormSubmission(
  enrollmentForm: EnrollmentForm,
): Promise<ApiResponse<null>> {
  const user: User = {
    firstName: enrollmentForm.generalInformationSection.firstName,
    lastName: enrollmentForm.generalInformationSection.lastName,
    email: enrollmentForm.generalInformationSection.email,
    password: enrollmentForm.generalInformationSection.password,
    role: "client",
    dateCreated: new Date().toISOString(),
    isEmailVerified: false,
  };

  // create user
  const [, createUserError] = await createUser(user);

  if (createUserError !== null) {
    return [null, createUserError];
  }

  // create enrollment form
  const [enrollmentFormInDatabase, createEnrollmentFormError] =
    await createEnrollmentForm(enrollmentForm);

  if (createEnrollmentFormError !== null) {
    return [null, createEnrollmentFormError];
  }

  // send email verification email
  await handleEmailVerificationTokenRequest(
    enrollmentFormInDatabase.generalInformationSection.email,
  );

  // create program enrollments
  await createProgramEnrollmentsFromEnrollmentForm(enrollmentFormInDatabase);

  return [null, null];
}
