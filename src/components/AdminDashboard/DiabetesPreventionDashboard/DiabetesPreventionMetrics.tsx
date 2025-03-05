"use client";

import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { ClientUser, ProgramEnrollment } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";
import getClosestPastSunday from "@/utils/getClosestPastSunday";

type DiabetesPreventionMetricsProps = {
  diabetesPreventionProgramEnrollments: ProgramEnrollment[];
};

export default function DiabetesPreventionMetrics({
  diabetesPreventionProgramEnrollments,
}: DiabetesPreventionMetricsProps): ReactNode {
  const totalEnrolled = diabetesPreventionProgramEnrollments.length;
  const totalActive = diabetesPreventionProgramEnrollments.reduce(
    (acc, programEnrollment) => {
      const user = programEnrollment.user as ClientUser;
      if (user.healthyHabitsTrackingForms.length <= 0) return acc;

      const latestFormSubmission = user.healthyHabitsTrackingForms[0];
      const latestFormSubmissionWeek = dayjsUtil(
        latestFormSubmission.weekOfSubmission,
      );
      const lastSunday = getClosestPastSunday();
      const lastSundayDayJs = dayjsUtil(lastSunday);

      if (lastSundayDayJs.diff(latestFormSubmissionWeek, "week") < 4) acc++;

      return acc;
    },
    0,
  );
  const registrationsInPast3Months =
    diabetesPreventionProgramEnrollments.reduce((acc, programEnrollment) => {
      const registrationDate = dayjsUtil(programEnrollment.dateEnrolled);
      if (registrationDate.diff(dayjsUtil(), "month") > -3) acc++;

      return acc;
    }, 0);

  return (
    <Box>
      <Typography align="center" variant="h4" sx={{ m: 2 }}>
        Diabetes Prevention Metrics
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
            <strong>Total Active:</strong> {totalActive}
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
