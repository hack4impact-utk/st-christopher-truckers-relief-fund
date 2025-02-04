import { Box, CircularProgress } from "@mui/material";
import { ReactNode } from "react";

export default function AdminDashboardLoadingSkeleton(): ReactNode {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
