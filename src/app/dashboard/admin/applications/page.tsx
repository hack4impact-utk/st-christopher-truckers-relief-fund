import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import PendingApplicationDashboard from "@/components/AdminDashboard/PendingApplicationDashboard";
import { getPendingProgramEnrollments } from "@/server/api/program-enrollments/queries";

export default async function AdminDashboardPage(): Promise<ReactNode> {
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
        <Typography>
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
