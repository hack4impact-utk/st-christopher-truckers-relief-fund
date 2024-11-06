import { Box } from "@mui/material";
import { redirect } from "next/navigation";

import PendingApplicationDashboard from "@/components/Dashboard/PendingApplicationsDashboard";
import getUserSession from "@/utils/getUserSession";

export default async function AdminDashboardPage() {
  const session = await getUserSession();

  if (!session || session.user.role !== "admin") {
    return redirect("/dashboard");
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
      <PendingApplicationDashboard />
    </Box>
  );
}
