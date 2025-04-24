import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import GetPreventativeScreeningsDashboard from "@/components/AdminDashboard/GetPreventativeScreeningsDashboard";
import { getGetPreventativeScreeningsProgramEnrollments } from "@/server/api/program-enrollments/queries";
import { getAllScreeningRequests } from "@/server/api/screening-requests.ts/queries";

export const dynamic = "force-dynamic";

export default async function GetPreventativeScreeningsProgramPage(): Promise<ReactNode> {
  const [programEnrollments, programEnrollmentsError] =
    await getGetPreventativeScreeningsProgramEnrollments();

  const [screeningRequests, screeningRequestsError] =
    await getAllScreeningRequests();

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
        <Typography>
          An error occurred while fetching your Get Preventative Screenings
          program enrollments.
        </Typography>
      </Box>
    );
  }

  if (screeningRequestsError !== null) {
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
          An error occurred while fetching your Get Preventative Screenings
          screening requests.
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
      <GetPreventativeScreeningsDashboard
        getPreventativeScreeningProgramEnrollments={programEnrollments}
        screeningRequests={screeningRequests}
      />
    </Box>
  );
}
