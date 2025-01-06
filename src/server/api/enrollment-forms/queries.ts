import dbConnect from "@/server/dbConnect";
import { EnrollmentFormModel } from "@/server/models";
import { EnrollmentForm } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";
import { serializeMongooseObject } from "@/utils/serializeMongooseObject";

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

    return [serializeMongooseObject(enrollmentForm), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}
