import { Box } from "@mui/material";
import { redirect } from "next/navigation";

import AdminSettings from "@/components/Settings/AdminSettings";
import getUserSession from "@/utils/getUserSession";

export default async function AdminSettingsPage() {
  const session = await getUserSession();

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  const { user } = session;

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
      <AdminSettings user={user} />
    </Box>
  );
}
