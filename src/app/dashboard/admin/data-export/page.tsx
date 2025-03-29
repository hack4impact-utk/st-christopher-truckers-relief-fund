import { Box } from "@mui/material";
import { ReactNode } from "react";

import DataExport from "@/components/AdminDashboard/DataExport";

export default function AdminDataExport(): ReactNode {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DataExport />
    </Box>
  );
}
