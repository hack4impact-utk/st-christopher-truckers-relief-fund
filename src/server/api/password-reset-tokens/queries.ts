import dbConnect from "@/server/dbConnect";
import { PasswordResetTokenModel } from "@/server/models";
import { ApiResponse, PasswordResetToken } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import dayjsUtil from "@/utils/dayjsUtil";
import { findOne } from "@/utils/db/find";
import { serializeMongooseObject } from "@/utils/serializeMongooseObject";

export async function getPasswordResetTokenByToken(
  token: string,
): Promise<ApiResponse<PasswordResetToken>> {
  await dbConnect();

  const [passwordResetToken, error] = await findOne(PasswordResetTokenModel, {
    filters: { token },
  });

  if (error !== null) {
    return [null, error];
  }

  const now = dayjsUtil().utc();
  const tokenHasExpired = dayjsUtil(passwordResetToken.expires).isBefore(now);
  if (tokenHasExpired) {
    return [null, apiErrors.passwordResetToken.passwordResetTokenExpired];
  }

  return [serializeMongooseObject(passwordResetToken), null];
}
