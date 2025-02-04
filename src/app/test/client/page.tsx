"use client";

import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

export default function ClientComponentTestPage(): ReactNode {
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
