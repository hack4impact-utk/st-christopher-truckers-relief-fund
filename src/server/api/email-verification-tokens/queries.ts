import dbConnect from "@/server/dbConnect";
import { EmailVerificationTokenModel } from "@/server/models";
import { ApiResponse, EmailVerificationToken } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";
import { serializeMongooseObject } from "@/utils/serializeMongooseObject";

export async function getEmailVerificationTokenByToken(
  token: string,
): Promise<ApiResponse<EmailVerificationToken>> {
  await dbConnect();

  try {
    const emailVerificationToken = await EmailVerificationTokenModel.findOne({
      token,
    })
      .lean<EmailVerificationToken>()
      .exec();

    if (!emailVerificationToken) {
      return [
        null,
        apiErrors.emailVerificationToken.emailVerificationTokenNotFound,
      ];
    }

    return [serializeMongooseObject(emailVerificationToken), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}
