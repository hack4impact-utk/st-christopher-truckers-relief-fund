import { Box, Typography } from "@mui/material";
import Link from "next/link";

import ResetPasswordForm from "@/components/ForgotPassword/ResetPasswordForm";
import { getPasswordResetTokenByToken } from "@/server/api/password-reset-tokens/queries";

type ResetPasswordWithTokenPageProps = {
  params: {
    token: string;
  };
};

export default async function ResetPasswordWithTokenPage({
  params,
}: ResetPasswordWithTokenPageProps) {
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
        <Typography variant="body1">This link has expired</Typography>
        <Link href="/forgot-password" style={{ textDecoration: "none" }}>
          <Typography variant="body1" color="primary">
            Click here to request a new password reset link.
          </Typography>
        </Link>
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
