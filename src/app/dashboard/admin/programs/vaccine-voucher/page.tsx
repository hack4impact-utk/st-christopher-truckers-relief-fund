import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

export default function VaccineVoucherProgramPage(): ReactNode {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>Vaccine Voucher Program</Typography>
    </Box>
  );
}
