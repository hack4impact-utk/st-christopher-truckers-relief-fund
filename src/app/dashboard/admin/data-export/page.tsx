import { Box } from "@mui/material";
import { ReactNode } from "react";

import DataExport from "@/components/AdminDashboard/DataExport";

export const dynamic = "force-dynamic";

export default function AdminDataExport(): ReactNode {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DataExport />
    </Box>
  );
}
