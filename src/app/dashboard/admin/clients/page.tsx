import { Box } from "@mui/material";
import { ReactNode } from "react";

import ClientManagementDashboard from "@/components/AdminDashboard/ClientManagementDashboard";

export default function AdminClientsPage(): ReactNode {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ClientManagementDashboard />
    </Box>
  );
}
