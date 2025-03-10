"use client";

import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { ProgramEnrollment } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

type GetPreventativeScreeningsMetricsProps = {
  getPreventativeScreeningsProgramEnrollments: ProgramEnrollment[];
};

export default function GetPreventativeScreeningsMetricsProps({
  getPreventativeScreeningsProgramEnrollments,
}: Readonly<GetPreventativeScreeningsMetricsProps>): ReactNode {
  const totalEnrolled = getPreventativeScreeningsProgramEnrollments.length;
  const registrationsInPast3Months =
    getPreventativeScreeningsProgramEnrollments.reduce(
      (acc, programEnrollment) => {
        const registrationDate = dayjsUtil(programEnrollment.dateEnrolled);
        if (registrationDate.diff(dayjsUtil(), "month") > -3) acc++;

        return acc;
      },
      0,
    );

  return (
    <Box>
      <Typography align="center" variant="h4" sx={{ m: 2 }}>
        Get Preventative Screenings Metrics
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            borderRadius: 2,
            boxShadow: 3,
            padding: 4,
          }}
        >
          <Typography>
            <strong>Total Enrolled:</strong> {totalEnrolled}
          </Typography>
          <Typography>
            <strong>Registrations in Past 3 Months:</strong>{" "}
            {registrationsInPast3Months}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
