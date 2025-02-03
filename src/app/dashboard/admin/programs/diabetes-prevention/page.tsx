import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

export default function DiabetesPreventionProgramPage(): ReactNode {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>Diabetes Prevention Program</Typography>
    </Box>
  );
}
