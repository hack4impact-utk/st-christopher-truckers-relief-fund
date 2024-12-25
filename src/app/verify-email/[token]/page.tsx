/* eslint-disable simple-import-sort/imports */
import { Box } from "@mui/material";

import VerifyEmailSuccess from "@/components/VerifyEmail/VerifyEmailSuccess";
import { getEmailVerificationTokenByToken } from "@/server/api/email-verification-tokens/queries";
import InvalidEmailVerificationToken from "@/components/VerifyEmail/InvalidEmailVerificationToken";

type VerifyEmailSuccessPageProps = {
  params: {
    token: string;
  };
};

export default async function VerifyEmailSuccessPage({
  params,
}: VerifyEmailSuccessPageProps) {
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
        <InvalidEmailVerificationToken />
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
