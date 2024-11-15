import { Box } from "@mui/material";
import { redirect } from "next/navigation";

import ClientSettings from "@/components/Settings/ClientSettings";
import getUserSession from "@/utils/getUserSession";

export default async function AdminSettingsPage() {
  const session = await getUserSession();

  if (!session || session.user.role !== "client") {
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
      <ClientSettings user={user} />
    </Box>
  );
}
