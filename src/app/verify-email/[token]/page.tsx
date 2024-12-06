/* eslint-disable simple-import-sort/imports */
import { Box } from "@mui/material";
import { redirect } from "next/navigation";

import VerifyEmailSuccess from "@/components/VerifyEmail/VerifyEmailSuccess";
import { getEmailVerificationTokenByToken } from "@/server/api/email-verification-tokens/queries";
import getUserSession from "@/utils/getUserSession";
import InvalidEmailVerificationToken from "@/components/VerifyEmail/InvalidEmailVerificationToken";

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
