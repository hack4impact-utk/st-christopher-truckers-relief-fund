import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

export default function AdminNotificationsPage(): ReactNode {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>Admin Notifications Page</Typography>
    </Box>
  );
}
