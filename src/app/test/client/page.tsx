"use client";

import { Box } from "@mui/material";

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
      <p>Client component test page</p>
    </Box>
  );
}
