import { EnrollmentFormModel } from "@/server/models";
import { ApiResponse, EnrollmentForm } from "@/types";
import { findOne } from "@/utils/db/find";

export async function getEnrollmentFormByEmail(
  email: string,
): Promise<ApiResponse<EnrollmentForm>> {
  const [enrollmentForm, error] = await findOne(EnrollmentFormModel, {
    filters: { "generalInformationSection.email": email },
  });

  if (error !== null) {
    return [null, error];
  }

  return [enrollmentForm, null];
}
