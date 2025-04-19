import { EnrollmentFormModel } from "@/server/models";
import { ApiResponse, EnrollmentForm } from "@/types";
import { findOne } from "@/utils/db/find";

export async function getEnrollmentFormByEmail(
  email: string,
): Promise<ApiResponse<EnrollmentForm>> {
  return await findOne(EnrollmentFormModel, {
    filters: { "generalInformationSection.email": email },
  });
}
