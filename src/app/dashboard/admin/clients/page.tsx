import { Box } from "@mui/material";
import { ReactNode } from "react";

import ClientManagementDashboard from "@/components/AdminDashboard/ClientManagementDashboard";

export const dynamic = "force-dynamic";

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
