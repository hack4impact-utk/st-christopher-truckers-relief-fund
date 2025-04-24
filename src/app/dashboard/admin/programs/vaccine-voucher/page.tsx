import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import VaccineVoucherDashboard from "@/components/AdminDashboard/VaccineVaccineDashboard";
import { getVaccineVoucherProgramEnrollments } from "@/server/api/program-enrollments/queries";
import { getAllVaccineVoucherRequests } from "@/server/api/vaccine-voucher-requests/queries";

export const dynamic = "force-dynamic";

export default async function VaccineVoucher(): Promise<ReactNode> {
  const [vaccineVoucherProgramEnrollments, programEnrollmentsError] =
    await getVaccineVoucherProgramEnrollments();

  const [vaccineVoucherRequests, vaccineVoucherRequestError] =
    await getAllVaccineVoucherRequests();

  if (programEnrollmentsError !== null) {
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

  if (vaccineVoucherRequestError !== null) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>
          There was an error fetching Vaccine Voucher Requests
        </Typography>
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
        vaccineVoucherProgramEnrollments={vaccineVoucherProgramEnrollments}
        vaccineVoucherRequests={vaccineVoucherRequests}
      />
    </Box>
  );
}
