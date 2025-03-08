"use client";

import VaccineVoucherApplyForm from "@/components/ClientDashboard/VaccineVoucher/VaccineVoucherApplyForm";
import VaccineVoucherHistory from "@/components/ClientDashboard/VaccineVoucher/VaccineVoucherHistory";
import { ClientUser } from "@/types";

import ClientProgramDashboard from "../ClientProgramDashboard";

type VaccineVoucherDashboardProps = {
  user: ClientUser;
};

export default function VaccineVoucherDashboard({
  user,
}: VaccineVoucherDashboardProps): JSX.Element {
  return (
    <ClientProgramDashboard
      title="Vaccine Voucher"
      defaultTab="apply"
      tabs={{
        apply: {
          title: "Apply",
          content: <VaccineVoucherApplyForm user={user} />,
        },
        history: {
          title: "History",
          content: <VaccineVoucherHistory />,
        },
      }}
    />
  );
}
