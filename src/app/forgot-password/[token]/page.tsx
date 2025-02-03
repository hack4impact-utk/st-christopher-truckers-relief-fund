import { Box } from "@mui/material";
import { ReactNode } from "react";

import InvalidPasswordResetToken from "@/components/ForgotPassword/InvalidPasswordResetToken";
import ResetPasswordForm from "@/components/ForgotPassword/ResetPasswordForm";
import { getPasswordResetTokenByToken } from "@/server/api/password-reset-tokens/queries";

type ResetPasswordWithTokenPageProps = {
  params: {
    token: string;
  };
};

export default async function ResetPasswordWithTokenPage({
  params,
}: ResetPasswordWithTokenPageProps): Promise<ReactNode> {
  const { token } = params;
  const [passwordResetToken, error] = await getPasswordResetTokenByToken(token);

  if (error !== null) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <InvalidPasswordResetToken />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ResetPasswordForm token={passwordResetToken.token} />;
    </Box>
  );
}
