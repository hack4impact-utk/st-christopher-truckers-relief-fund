import dbConnect from "@/server/dbConnect";
import { EnrollmentFormModel } from "@/server/models";
import { EnrollmentForm } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";

export async function getEnrollmentFormByEmail(email: string) {
  await dbConnect();

  try {
    const enrollmentForm = await EnrollmentFormModel.findOne({
      "generalInformationSection.email": email,
    })
      .lean<EnrollmentForm>()
      .exec();

    if (!enrollmentForm) {
      return [null, apiErrors.enrollmentForm.enrollmentFormNotFound];
    }

    // convert ObjectId to string
    enrollmentForm._id = String(enrollmentForm._id);

    return [enrollmentForm, null];
  } catch (error) {
    return [null, handleMongooseError(error)];
  }
}
