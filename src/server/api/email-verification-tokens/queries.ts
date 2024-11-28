import dbConnect from "@/server/dbConnect";
import { EmailVerificationTokenModel } from "@/server/models";
import { ApiResponse, EmailVerificationToken } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";

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

    // convert ObjectId to string
    emailVerificationToken._id = String(emailVerificationToken._id);

    return [emailVerificationToken, null];
  } catch (error) {
    return [null, handleMongooseError(error)];
  }
}
