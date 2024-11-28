import { Box } from "@mui/material";
import { redirect } from "next/navigation";

import VerifyEmail from "@/components/VerifyEmail/VerifyEmail";
import getUserSession from "@/utils/getUserSession";

export default async function VerifyEmailPage() {
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
