"use server";

import { sendPasswordResetEmail } from "@/server/api/emails/actions";
import { getPasswordResetTokenByToken } from "@/server/api/password-reset-tokens/queries";
import { getUserByEmail } from "@/server/api/users/queries";
import { PasswordResetTokenModel } from "@/server/models";
import { ApiResponse, PasswordResetToken } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import dayjsUtil from "@/utils/dayjsUtil";
import handleMongooseError from "@/utils/handleMongooseError";

export async function createPasswordResetToken(
  token: string,
  userId: string,
  expires: string,
): Promise<ApiResponse<PasswordResetToken>> {
  try {
    // don't create password reset token if one already exists
    const passwordResetTokenResponse =
      await getPasswordResetTokenByToken(token);

    if (passwordResetTokenResponse.success) {
      return {
        success: false,
        error: apiErrors.passwordResetToken.passwordResetTokenAlreadyExists,
      };
    }

    const newPasswordResetToken: PasswordResetToken = {
      token,
      userId,
      expires,
    };

    const newPasswordResetTokenDocument = await PasswordResetTokenModel.create(
      newPasswordResetToken,
    );

    const passwordResetToken = newPasswordResetTokenDocument.toObject();

    // convert ObjectId to string
    passwordResetToken._id = String(passwordResetToken._id);

    return { success: true, data: passwordResetToken };
  } catch (error) {
    return { success: false, error: handleMongooseError(error) };
  }
}

export async function deletePasswordResetToken(
  token: string,
): Promise<ApiResponse<null>> {
  try {
    const passwordResetToken = await PasswordResetTokenModel.findOneAndDelete({
      token,
    });

    if (!passwordResetToken) {
      return {
        success: false,
        error: apiErrors.passwordResetToken.passwordResetTokenNotFound,
      };
    }

    return { success: true, data: null };
  } catch (error) {
    return { success: false, error: handleMongooseError(error) };
  }
}

export async function handlePasswordResetRequest(email: string) {
  // check if email exists
  const userResponse = await getUserByEmail(email);

  if (!userResponse.success) {
    return;
  }

  const user = userResponse.data;

  if (!user._id) {
    return;
  }

  // generate a password reset token
  const oneHourFromNow = dayjsUtil().utc().add(1, "hour").toISOString();
  const token: PasswordResetToken = {
    token: crypto.randomUUID(),
    userId: user._id,
    expires: oneHourFromNow,
  };

  const createPasswordResetTokenResponse = await createPasswordResetToken(
    token.token,
    token.userId,
    token.expires,
  );

  if (!createPasswordResetTokenResponse.success) {
    return;
  }

  await sendPasswordResetEmail(email, token.token);
}
