import { EnrollmentFormModel } from "@/server/models";
import { ApiResponse, EnrollmentForm } from "@/types";
import { findOne } from "@/utils/db/find";
import { serializeMongooseObject } from "@/utils/serializeMongooseObject";

export async function getEnrollmentFormByEmail(
  email: string,
): Promise<ApiResponse<EnrollmentForm>> {
  const [enrollmentForm, error] = await findOne(EnrollmentFormModel, {
    filters: { "generalInformationSection.email": email },
  });

  if (error !== null) {
    return [null, error];
  }

  return [serializeMongooseObject(enrollmentForm), null];
}
