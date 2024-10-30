import { Box } from "@mui/material";
import { redirect } from "next/navigation";

import SignOutButton from "@/components/Settings/SignOutButton";
import getUserSession from "@/utils/getUserSession";

export default async function AdminSettingsPage() {
  const session = await getUserSession();

  if (!session || session.user.role !== "admin") {
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
      <p>Admin settings page</p>
      <SignOutButton />
    </Box>
  );
}
