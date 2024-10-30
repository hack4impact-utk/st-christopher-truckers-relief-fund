import { Box } from "@mui/material";
import { redirect } from "next/navigation";

import SignOutButton from "@/components/Settings/SignOutButton";
import getUserSession from "@/utils/getUserSession";

export default async function ClientSettingsPage() {
  const session = await getUserSession();

  if (!session || session.user.role !== "client") {
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
        flexDirection: "column",
      }}
    >
      <p>Client settings page</p>
      <SignOutButton />
    </Box>
  );
}
