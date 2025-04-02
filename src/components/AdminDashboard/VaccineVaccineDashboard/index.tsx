"use client";

import { ReactNode } from "react";

import { ProgramEnrollment, VaccineVoucherRequest } from "@/types";

import AdminProgramDashboard from "../AdminProgramDashboard";
import VaccineVoucherClientDashboard from "./VaccineVoucherDashboard";
import VaccineVoucherMetrics from "./VaccineVoucherMetrics";
import VaccineVoucherRequestsTable from "./VaccineVoucherRequestsTable";

type VaccineVoucherDashboardProps = {
  vaccineVoucherProgramEnrollments: ProgramEnrollment[];
  vaccineVoucherRequests: VaccineVoucherRequest[];
};

export default function VaccineVoucherDashboard({
  vaccineVoucherProgramEnrollments,
  vaccineVoucherRequests,
}: Readonly<VaccineVoucherDashboardProps>): ReactNode {
  return (
    <AdminProgramDashboard
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
              vaccineVoucherProgramEnrollments={vaccineVoucherProgramEnrollments}
              vaccineVoucherRequests={vaccineVoucherRequests}
            />
          ),
        },
        requests: {
          title: "Vaccine Voucher Requests",
          content: (
            <VaccineVoucherRequestsTable
              vaccineVoucherRequests={vaccineVoucherRequests}
            />
          ),
        },
      }}
    />
  );
}
