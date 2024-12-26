"use client";

import { Box, Typography } from "@mui/material";

export default function ClientComponentTestPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Typography>Client component test page</Typography>
    </Box>
  );
}
