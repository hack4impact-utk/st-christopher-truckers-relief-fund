import { Box } from "@mui/material";
import { ReactNode } from "react";

import { ProgramEnrollment } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

import MetricsTable from "../MetricsTable";

type RigsWithoutCigsMetricProps = {
  rigsWithoutCigsProgramEnrollments: ProgramEnrollment[];
};

export default function RigsWithoutCigsMetric({
  rigsWithoutCigsProgramEnrollments,
}: Readonly<RigsWithoutCigsMetricProps>): ReactNode {
  const totalEnrolled = rigsWithoutCigsProgramEnrollments.length;
  const registrationsInPast3Months = rigsWithoutCigsProgramEnrollments.reduce(
    (acc, programEnrollment) => {
      const registrationDate = dayjsUtil(programEnrollment.dateEnrolled);
      if (registrationDate.diff(dayjsUtil(), "month") > -3) acc++;

      return acc;
    },
    0,
  );

  return (
    <Box>
      <MetricsTable
        title="Overview"
        rows={[
          { label: "Total Enrolled", value: totalEnrolled },
          {
            label: "Registrations in Past 3 Months",
            value: registrationsInPast3Months,
          },
        ]}
      />
    </Box>
  );
}
