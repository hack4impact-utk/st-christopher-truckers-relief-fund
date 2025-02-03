import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import ClientManagementDashboard from "@/components/AdminDashboard/ClientManagementDashboard";
import { getClients } from "@/server/api/users/queries";

export default async function AdminClientsPage(): Promise<ReactNode> {
  const [clients, error] = await getClients({
    populateProgramEnrollments: true,
    populateHealthyHabitsTrackingForms: true,
    populateEnrollmentForm: true,
  });

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
      <ClientManagementDashboard clients={clients} />
    </Box>
  );
}
