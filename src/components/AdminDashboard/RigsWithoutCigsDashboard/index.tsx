"use client";

import { ReactNode } from "react";

import { ProgramEnrollment } from "@/types";

import AdminProgramDashboard from "../AdminProgramDashboard";
import RigsWithoutCigsClientDashboard from "./RigsWithoutCigsClientDashboard";
import RigsWithoutCigsMetric from "./RigsWithoutCigsMetric";

type RigsWithoutCigsDashboardProps = {
  rigsWithoutCigsProgramEnrollments: ProgramEnrollment[];
};

export default function RigsWithoutCigsDashboard({
  rigsWithoutCigsProgramEnrollments,
}: Readonly<RigsWithoutCigsDashboardProps>): ReactNode {
  return (
    <AdminProgramDashboard
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
