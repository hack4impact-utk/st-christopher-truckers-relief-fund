"use client";
import { ReactNode } from "react";

import { ProgramEnrollment, ScreeningRequest } from "@/types";

import AdminProgramDashboard from "../AdminProgramDashboard";
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
}: Readonly<GetPreventativeScreeningsDashboardProps>): ReactNode {
  return (
    <AdminProgramDashboard
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
