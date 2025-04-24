import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default function AdminProgramsPage(): ReactNode {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>Please select a program on the left sidebar.</Typography>
    </Box>
  );
}
