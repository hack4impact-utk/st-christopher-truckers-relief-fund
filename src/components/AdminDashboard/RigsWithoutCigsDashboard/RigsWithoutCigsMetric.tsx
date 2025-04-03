import { Box } from "@mui/material";
import { ReactNode } from "react";

import { ClientUser, ProgramEnrollment } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

import MetricsTable from "../MetricsTable";

type RigsWithoutCigsMetricProps = {
  rigsWithoutCigsProgramEnrollments: ProgramEnrollment[];
};

type RigsWithoutCigsStatusCounts = {
  unknown: number;
  quit: number;
  cutBack: number;
  inProgress: number;
  noSuccess: number;
  notYetStarted: number;
  withdrawn: number;
};

function getRigsWithoutCigsStatusCounts(
  rigsWithoutCigsProgramEnrollments: ProgramEnrollment[],
): RigsWithoutCigsStatusCounts {
  return rigsWithoutCigsProgramEnrollments.reduce(
    (acc, programEnrollment) => {
      const user = programEnrollment.user as ClientUser;
      const status = user.rigsWithoutCigsStatus;
      switch (status) {
        case "unknown":
          acc.unknown++;
          break;
        case "quit":
          acc.quit++;
          break;
        case "cut back":
          acc.cutBack++;
          break;
        case "in progress":
          acc.inProgress++;
          break;
        case "no success":
          acc.noSuccess++;
          break;
        case "not yet started":
          acc.notYetStarted++;
          break;
        case "withdrawn":
          acc.withdrawn++;
          break;
      }
      return acc;
    },
    {
      unknown: 0,
      quit: 0,
      cutBack: 0,
      inProgress: 0,
      noSuccess: 0,
      notYetStarted: 0,
      withdrawn: 0,
    },
  );
}

function getMetricTableDisplayValue(
  label: keyof RigsWithoutCigsStatusCounts,
): string {
  switch (label) {
    case "unknown":
      return "Unknown";
    case "quit":
      return "Quit";
    case "cutBack":
      return "Cut back";
    case "inProgress":
      return "In progress";
    case "noSuccess":
      return "No success";
    case "notYetStarted":
      return "Not yet started";
    case "withdrawn":
      return "Withdrawn";
  }
}
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

  const statusCounts = getRigsWithoutCigsStatusCounts(
    rigsWithoutCigsProgramEnrollments,
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
      <MetricsTable
        title="Status Counts"
        rows={Object.entries(statusCounts).map(([status, count]) => ({
          label: getMetricTableDisplayValue(
            status as keyof RigsWithoutCigsStatusCounts,
          ),
          value: count,
        }))}
      />
    </Box>
  );
}
