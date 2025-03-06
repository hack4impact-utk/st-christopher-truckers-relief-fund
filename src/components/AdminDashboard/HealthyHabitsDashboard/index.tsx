"use client";

import { ReactNode } from "react";

import { ProgramEnrollment } from "@/types";

import ProgramDashboard from "../ProgramDashboard";
import HealthyHabitsClientDashboard from "./HealthyHabitsClientDashboard";
import HealthyHabitsMetrics from "./HealthyHabitsMetrics";

type HealthyHabitsDashboardProps = {
  healthyHabitsProgramEnrollments: ProgramEnrollment[];
};

export default function HealthyHabitsDashboard({
  healthyHabitsProgramEnrollments,
}: HealthyHabitsDashboardProps): ReactNode {
  return (
    <ProgramDashboard
      defaultTab="clients"
      tabs={{
        clients: {
          title: "Clients",
          content: (
            <HealthyHabitsClientDashboard
              healthyHabitsProgramEnrollments={healthyHabitsProgramEnrollments}
            />
          ),
        },
        metrics: {
          title: "Metrics",
          content: (
            <HealthyHabitsMetrics
              healthyHabitsProgramEnrollments={healthyHabitsProgramEnrollments}
            />
          ),
        },
      }}
    />
  );
}
