import { getEnrollmentFormByEmail } from "@/server/api/enrollment-forms/queries";
import dbConnect from "@/server/dbConnect";
import { EnrollmentFormModel } from "@/server/models";
import { ApiResponse, EnrollmentForm } from "@/types";
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
