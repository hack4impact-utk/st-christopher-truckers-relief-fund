import { Box, Typography } from "@mui/material";

export default function AdminDashboardLoadingSkeleton() {
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
      <Typography variant="body1">Loading...</Typography>
    </Box>
  );
}
