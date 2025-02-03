import { Box } from "@mui/material";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import VerifyEmail from "@/components/VerifyEmail/VerifyEmail";
import getUserSession from "@/utils/getUserSession";

export default async function VerifyEmailPage(): Promise<ReactNode> {
  const session = await getUserSession();

  if (!session) {
    redirect("/");
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
      <VerifyEmail email={session.user.email} />
    </Box>
  );
}
