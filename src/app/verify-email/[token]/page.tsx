import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { redirect } from "next/navigation";

import VerifyEmailSuccess from "@/components/VerifyEmail/VerifyEmailSuccess";
import { getEmailVerificationTokenByToken } from "@/server/api/email-verification-tokens/queries";
import getUserSession from "@/utils/getUserSession";

type VerifyEmailSuccessPageProps = {
  params: {
    token: string;
  };
};

export default async function VerifyEmailSuccessPage({
  params,
}: VerifyEmailSuccessPageProps) {
  const session = await getUserSession();

  if (!session) {
    redirect("/");
  }

  const { token } = params;

  const [emailVerificationToken, error] =
    await getEmailVerificationTokenByToken(token);

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
        <Link href="/verify-email" style={{ textDecoration: "none" }}>
          <Typography variant="body1" color="primary">
            Click here to request a new verification link.
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
      <VerifyEmailSuccess emailVerificationToken={emailVerificationToken} />
    </Box>
  );
}
