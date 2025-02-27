import dbConnect from "@/server/dbConnect";
import { UserModel } from "@/server/models";
import { ApiResponse, ProgramSpecificQuestionsSection, User } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";
import { serializeMongooseObject } from "@/utils/serializeMongooseObject";

export async function updateRigsWithoutCigsInformation(
  email: string,
  programSpecificQuestionsSection: ProgramSpecificQuestionsSection,
): Promise<ApiResponse<User>> {
  await dbConnect();

  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      {
        $set: {
          "enrollmentForm.programSpecificQuestionsSection":
            programSpecificQuestionsSection,
        },
      },
      { new: true, lean: true },
    ).exec();

    if (!updatedUser) {
      return [null, apiErrors.user.userNotFound];
    }

    return [serializeMongooseObject(updatedUser), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}
