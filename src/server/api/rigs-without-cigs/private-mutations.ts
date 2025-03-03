import dbConnect from "@/server/dbConnect";
import { EnrollmentFormModel, UserModel } from "@/server/models";
import {
  ApiResponse,
  ClientUser,
  ProgramSpecificQuestionsSection,
  User,
} from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";
import { serializeMongooseObject } from "@/utils/serializeMongooseObject";

export async function updateRigsWithoutCigsInformation(
  email: string,
  programSpecificQuestionsSection: ProgramSpecificQuestionsSection,
): Promise<ApiResponse<User>> {
  await dbConnect();

  try {
    // First find the user to get their enrollment form ID
    const user = await UserModel.findOne({ email }).exec();

    if (!user) {
      return [null, apiErrors.user.userNotFound];
    }

    // Check if user is a client
    if (user.role !== "client") {
      return [null, apiErrors.unauthorized];
    }

    // Now TypeScript knows this is a ClientUser
    const clientUser = user as unknown as ClientUser;

    if (!clientUser.enrollmentForm) {
      return [null, apiErrors.enrollmentForm.enrollmentFormNotFound];
    }

    // Update the enrollment form document
    const updatedEnrollmentForm = await EnrollmentFormModel.findByIdAndUpdate(
      clientUser.enrollmentForm,
      {
        $set: {
          programSpecificQuestionsSection: programSpecificQuestionsSection,
        },
      },
      { new: true },
    ).exec();

    if (!updatedEnrollmentForm) {
      return [null, apiErrors.enrollmentForm.enrollmentFormNotFound];
    }

    // Get the updated user with populated enrollment form
    const updatedUser = await UserModel.findOne({ email })
      .populate("enrollmentForm")
      .lean()
      .exec();

    if (!updatedUser) {
      return [null, apiErrors.user.userNotFound];
    }

    return [serializeMongooseObject(updatedUser), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}
