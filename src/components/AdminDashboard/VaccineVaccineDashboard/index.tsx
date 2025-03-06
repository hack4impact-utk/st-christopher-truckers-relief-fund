"use client";

import { ReactNode } from "react";

import { ProgramEnrollment } from "@/types";

import ProgramDashboard from "../ProgramDashboard";
import VaccineVoucherClientDashboard from "./VaccineVoucherDashboard";
import VaccineVoucherMetrics from "./VaccineVoucherMetrics";

type VaccineVoucherDashboardProps = {
  vaccineVoucherProgramEnrollments: ProgramEnrollment[];
};

export default function VaccineVoucherDashboard({
  vaccineVoucherProgramEnrollments,
}: VaccineVoucherDashboardProps): ReactNode {
  return (
    <ProgramDashboard
      defaultTab="clients"
      tabs={{
        clients: {
          title: "Clients",
          content: (
            <VaccineVoucherClientDashboard
              vaccineVoucherProgramEnrollments={
                vaccineVoucherProgramEnrollments
              }
            />
          ),
        },
        metrics: {
          title: "Metrics",
          content: (
            <VaccineVoucherMetrics
              VaccineVoucherProgramEnrollments={
                vaccineVoucherProgramEnrollments
              }
            />
          ),
        },
      }}
    />
  );
}
