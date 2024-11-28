import dbConnect from "@/server/dbConnect";
import { PasswordResetTokenModel } from "@/server/models";
import { ApiResponse, PasswordResetToken } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import dayjsUtil from "@/utils/dayjsUtil";
import handleMongooseError from "@/utils/handleMongooseError";

export async function getPasswordResetTokenByToken(
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
      return [null, apiErrors.passwordResetToken.passwordResetTokenNotFound];
    }

    const now = dayjsUtil().utc();
    const tokenHasExpired = dayjsUtil(passwordResetToken.expires).isBefore(now);
    if (tokenHasExpired) {
      return [null, apiErrors.passwordResetToken.passwordResetTokenExpired];
    }

    // convert ObjectId to string
    passwordResetToken._id = String(passwordResetToken._id);

    return [passwordResetToken, null];
  } catch (error) {
    return [null, handleMongooseError(error)];
  }
}
