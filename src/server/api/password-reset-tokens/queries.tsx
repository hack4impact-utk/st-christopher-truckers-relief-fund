import dbConnect from "@/server/dbConnect";
import { PasswordResetTokenModel } from "@/server/models";
import { ApiResponse, PasswordResetToken } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import dayjs from "@/utils/dayjs";
import handleMongooseError from "@/utils/handleMongooseError";

export default async function getPasswordResetTokenByToken(
  token: string,
): Promise<ApiResponse<PasswordResetToken>> {
  await dbConnect();

  try {
    const passwordResetToken = await PasswordResetTokenModel.findOne({
      token,
    })
      .lean<PasswordResetToken>()
      .exec();

    if (!passwordResetToken) {
      return {
        success: false,
        error: apiErrors.passwordResetToken.passwordResetTokenNotFound,
      };
    }

    const tokenHasExpired = dayjs(passwordResetToken.expires).isBefore(
      dayjs().utc(),
    );
    if (tokenHasExpired) {
      return {
        success: false,
        error: apiErrors.passwordResetToken.passwordResetTokenExpired,
      };
    }

    // convert ObjectId to string
    passwordResetToken._id = String(passwordResetToken._id);

    return { success: true, data: passwordResetToken };
  } catch (error) {
    return { success: false, error: handleMongooseError(error) };
  }
}
