import dbConnect from "@/server/dbConnect";
import { EnrollmentFormModel } from "@/server/models";
import { ApiResponse, EnrollmentForm } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";
import { serializeMongooseObject } from "@/utils/serializeMongooseObject";

import { getEnrollmentFormByEmail } from "./queries";

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

    return [serializeMongooseObject(newEnrollmentForm), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}
