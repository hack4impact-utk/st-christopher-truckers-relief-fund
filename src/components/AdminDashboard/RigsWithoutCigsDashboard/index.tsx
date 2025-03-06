"use client";

import { ReactNode } from "react";

import { ProgramEnrollment } from "@/types";

import ProgramDashboard from "../ProgramDashboard";
import RigsWithoutCigsClientDashboard from "./RigsWithoutCigsClientDashboard";
import RigsWithoutCigsMetric from "./RigsWithoutCigsMetric";

type RigsWithoutCigsDashboardProps = {
  rigsWithoutCigsProgramEnrollments: ProgramEnrollment[];
};

export default function RigsWithoutCigsDashboard({
  rigsWithoutCigsProgramEnrollments,
}: RigsWithoutCigsDashboardProps): ReactNode {
  return (
    <ProgramDashboard
      defaultTab="clients"
      tabs={{
        clients: {
          title: "Clients",
          content: (
            <RigsWithoutCigsClientDashboard
              rigsWithoutCigsProgramEnrollments={
                rigsWithoutCigsProgramEnrollments
              }
            />
          ),
        },
        metrics: {
          title: "Metrics",
          content: (
            <RigsWithoutCigsMetric
              rigsWithoutCigsProgramEnrollments={
                rigsWithoutCigsProgramEnrollments
              }
            />
          ),
        },
      }}
    />
  );
}
