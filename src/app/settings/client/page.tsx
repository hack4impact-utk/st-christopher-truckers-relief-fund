import { Box, Typography } from "@mui/material";
import { redirect } from "next/navigation";

import ClientSettings from "@/components/Settings/ClientSettings";
import { getUserByEmail } from "@/server/api/users/queries";
import getUserSession from "@/utils/getUserSession";

export default async function AdminSettingsPage() {
  const session = await getUserSession();

  if (!session || session.user.role !== "client") {
    redirect("/");
  }

  const { user } = session;

  const [userWithProgramEnrollments, error] = await getUserByEmail(user.email, {
    populateProgramEnrollments: true,
  });

  if (error !== null) {
    console.error(error);
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>There was an error loading the settings.</Typography>
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
        flexDirection: "column",
        gap: 2,
      }}
    >
      <ClientSettings user={userWithProgramEnrollments} />
    </Box>
  );
}
