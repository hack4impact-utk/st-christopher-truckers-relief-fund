"use client";

import { ReactNode } from "react";

import { ProgramEnrollment } from "@/types";

import AdminProgramDashboard from "../AdminProgramDashboard";
import DiabetesPreventionClientsDashboard from "./DiabetesPreventionClientsDashboard";
import DiabetesPreventionMetrics from "./DiabetesPreventionMetrics";

type DiabetesPreventionDashboardProps = {
  diabetesPreventionProgramEnrollments: ProgramEnrollment[];
};

export default function DiabetesPreventionDashboard({
  diabetesPreventionProgramEnrollments,
}: DiabetesPreventionDashboardProps): ReactNode {
  return (
    <AdminProgramDashboard
      defaultTab="clients"
      tabs={{
        clients: {
          title: "Clients",
          content: (
            <DiabetesPreventionClientsDashboard
              diabetesPreventionProgramEnrollments={
                diabetesPreventionProgramEnrollments
              }
            />
          ),
        },
        metrics: {
          title: "Metrics",
          content: (
            <DiabetesPreventionMetrics
              diabetesPreventionProgramEnrollments={
                diabetesPreventionProgramEnrollments
              }
            />
          ),
        },
      }}
    />
  );
}
