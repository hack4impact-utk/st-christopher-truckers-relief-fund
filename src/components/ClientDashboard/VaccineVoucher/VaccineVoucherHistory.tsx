import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

export default function VaccineVoucherHistory(): ReactNode {
  return (
    <Box
      sx={{
        width: "min(90vw, 700px)",
        boxShadow: 3,
        borderRadius: 2,
        padding: 4,
      }}
    >
      <Typography variant="h5" textAlign="center" gutterBottom>
        History
      </Typography>
    </Box>
  );
}
