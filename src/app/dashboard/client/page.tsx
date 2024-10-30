import { Box } from "@mui/material";
import { redirect } from "next/navigation";

import getUserSession from "@/utils/getUserSession";

export default async function ClientDashboardPage() {
  const session = await getUserSession();

  if (!session || session.user.role !== "client") {
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
      <p>Client dashboard page</p>
    </Box>
  );
}
