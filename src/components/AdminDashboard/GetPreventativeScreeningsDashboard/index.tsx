"use client";
import { ReactNode } from "react";

import { ProgramEnrollment, ScreeningRequest } from "@/types";

import ProgramDashboard from "../ProgramDashboard";
import GetPreventativeScreeningsClientDashboard from "./GetPreventativeScreeningsClientDashboard";
import GetPreventativeScreeningsMetrics from "./GetPreventativeScreeningsMetrics";
import ScreeningRequestManagementTable from "./ScreeningRequestManagementTable";

type GetPreventativeScreeningsDashboardProps = {
  getPreventativeScreeningProgramEnrollments: ProgramEnrollment[];
  screeningRequests: ScreeningRequest[];
};

export default function GetPreventativeScreeningsDashboard({
  getPreventativeScreeningProgramEnrollments,
  screeningRequests,
}: GetPreventativeScreeningsDashboardProps): ReactNode {
  return (
    <ProgramDashboard
      defaultTab="clients"
      tabs={{
        clients: {
          title: "Clients",
          content: (
            <GetPreventativeScreeningsClientDashboard
              getPreventativeScreeningProgramEnrollments={
                getPreventativeScreeningProgramEnrollments
              }
            />
          ),
        },
        metrics: {
          title: "Metrics",
          content: (
            <GetPreventativeScreeningsMetrics
              getPreventativeScreeningsProgramEnrollments={
                getPreventativeScreeningProgramEnrollments
              }
            />
          ),
        },
        requests: {
          title: "Requests",
          content: (
            <ScreeningRequestManagementTable
              screeningRequests={screeningRequests}
            />
          ),
        },
      }}
    />
  );
}
