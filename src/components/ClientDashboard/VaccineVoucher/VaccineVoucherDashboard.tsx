"use client";

import { useState } from "react";

import VaccineVoucherApplyForm from "@/components/ClientDashboard/VaccineVoucher/VaccineVoucherApplyForm/VaccineVoucherApplyForm";
import VaccineVoucherHistory from "@/components/ClientDashboard/VaccineVoucher/VaccineVoucherHistory";
import { ClientUser, VaccineVoucherRequest } from "@/types";

import ClientProgramDashboard from "../ClientProgramDashboard";

type VaccineVoucherDashboardProps = {
  user: ClientUser;
};

export default function VaccineVoucherDashboard({
  user,
}: Readonly<VaccineVoucherDashboardProps>): JSX.Element {
  const [vaccineVoucherRequests, setVaccineVoucherRequests] = useState<
    VaccineVoucherRequest[]
  >(user.vaccineVoucherRequests);

  return (
    <ClientProgramDashboard
      title="Vaccine Voucher"
      defaultTab="apply"
      tabs={{
        apply: {
          title: "Apply",
          content: (
            <VaccineVoucherApplyForm
              user={user}
              vaccineVoucherRequests={vaccineVoucherRequests}
              setVaccineVoucherRequests={setVaccineVoucherRequests}
            />
          ),
        },
        history: {
          title: "History",
          content: (
            <VaccineVoucherHistory
              vaccineVoucherRequests={vaccineVoucherRequests}
              setVaccineVoucherRequests={setVaccineVoucherRequests}
            />
          ),
        },
      }}
    />
  );
}
