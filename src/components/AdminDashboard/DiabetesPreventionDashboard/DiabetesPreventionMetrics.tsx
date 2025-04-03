"use client";

import { Box } from "@mui/material";
import { ReactNode } from "react";

import { ClientUser, ProgramEnrollment } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";
import getClosestPastSunday from "@/utils/getClosestPastSunday";

import MetricsTable from "../MetricsTable";

type DiabetesPreventionMetricsProps = {
  diabetesPreventionProgramEnrollments: ProgramEnrollment[];
};

export default function DiabetesPreventionMetrics({
  diabetesPreventionProgramEnrollments,
}: Readonly<DiabetesPreventionMetricsProps>): ReactNode {
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
      <MetricsTable
        title="Overview"
        rows={[
          { label: "Total Enrolled", value: totalEnrolled },
          {
            label: "Total Active",
            value: totalActive,
          },
          {
            label: "Registrations in Past 3 Months",
            value: registrationsInPast3Months,
          },
        ]}
      />
    </Box>
  );
}
