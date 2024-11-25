import { Box, Typography } from "@mui/material";
import { redirect } from "next/navigation";

import PendingApplicationDashboard from "@/components/AdminDashboard/PendingApplicationDashboard";
import { getPendingProgramEnrollments } from "@/server/api/program-enrollments/queries";
import getUserSession from "@/utils/getUserSession";

export default async function AdminDashboardPage() {
  const session = await getUserSession();

  if (!session || session.user.role !== "admin") {
    return redirect("/dashboard");
  }

  const [programEnrollments, error] = await getPendingProgramEnrollments();

  if (error !== null) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="body1">
          There was an error fetching pending applications
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PendingApplicationDashboard programEnrollments={programEnrollments} />
    </Box>
  );
}
