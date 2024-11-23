"use server";

import { handleEmailVerificationTokenRequest } from "@/server/api/email-verification-tokens/mutations";
import { getEnrollmentFormByEmail } from "@/server/api/enrollment-forms/queries";
import { createProgramEnrollmentsFromEnrollmentForm } from "@/server/api/program-enrollments/mutations";
import { createUser } from "@/server/api/users/mutations";
import dbConnect from "@/server/dbConnect";
import { EnrollmentFormModel } from "@/server/models";
import { ApiResponse, EnrollmentForm, User } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";

export async function createEnrollmentForm(
  enrollmentForm: EnrollmentForm,
): Promise<ApiResponse<EnrollmentForm>> {
  await dbConnect();

  try {
    // don't create enrollment form if one already exists
    const [existingEnrollmentForm] = await getEnrollmentFormByEmail(
      enrollmentForm.generalInformationSection.email,
    );

    if (existingEnrollmentForm) {
      return [null, apiErrors.enrollmentForm.enrollmentFormAlreadyExists];
    }

    const newEnrollmentFormDocument =
      await EnrollmentFormModel.create(enrollmentForm);

    // convert ObjectId to string
    const newEnrollmentForm = newEnrollmentFormDocument.toObject();
    newEnrollmentForm._id = String(newEnrollmentForm._id);

    return [newEnrollmentForm, null];
  } catch (error) {
    return [null, handleMongooseError(error)];
  }
}

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
    emailVerified: false,
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
