import { EnrollmentFormModel } from "@/server/models";
import { ApiResponse, EnrollmentForm } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import { create } from "@/utils/db/create";
import { findOneAndUpdate } from "@/utils/db/update";

import { getEnrollmentFormByEmail } from "./queries";

export async function createEnrollmentForm(
  enrollmentForm: EnrollmentForm,
): Promise<ApiResponse<EnrollmentForm>> {
  const [existingEnrollmentForm] = await getEnrollmentFormByEmail(
    enrollmentForm.generalInformationSection.email,
  );

  if (existingEnrollmentForm) {
    return [null, apiErrors.duplicate];
  }
  return await create(EnrollmentFormModel, enrollmentForm);
}

export async function updateEnrollmentForm(
  enrollmentForm: EnrollmentForm,
): Promise<ApiResponse<EnrollmentForm>> {
  return await findOneAndUpdate(EnrollmentFormModel, enrollmentForm);
}
