"use client";

import { ReactNode, useState } from "react";

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
  const [programEnrollments, setProgramEnrollments] = useState<
    ProgramEnrollment[]
  >(rigsWithoutCigsProgramEnrollments);

  return (
    <AdminProgramDashboard
      defaultTab="clients"
      tabs={{
        clients: {
          title: "Clients",
          content: (
            <RigsWithoutCigsClientDashboard
              rigsWithoutCigsProgramEnrollments={programEnrollments}
              setProgramEnrollments={setProgramEnrollments}
            />
          ),
        },
        metrics: {
          title: "Metrics",
          content: (
            <RigsWithoutCigsMetric
              rigsWithoutCigsProgramEnrollments={programEnrollments}
            />
          ),
        },
      }}
    />
  );
}
