import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import VaccineVoucherDashboard from "@/components/AdminDashboard/VaccineVaccineDashboard";
import { getVaccineVoucherProgramEnrollments } from "@/server/api/program-enrollments/queries";

export default async function VaccineVoucher(): Promise<ReactNode> {
  const [VaccineVoucherProgramEnrollments, error] =
    await getVaccineVoucherProgramEnrollments();

  if (error !== null) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>There was an error fetching Vaccine Voucher</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
        padding: 4,
      }}
    >
      <VaccineVoucherDashboard
        vaccineVoucherProgramEnrollments={VaccineVoucherProgramEnrollments}
      />
    </Box>
  );
}
