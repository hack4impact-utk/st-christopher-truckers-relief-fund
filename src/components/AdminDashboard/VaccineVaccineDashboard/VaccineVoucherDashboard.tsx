"use client";

import { ReactNode } from "react";

import { ClientUser, ProgramEnrollment, User } from "@/types";

import ProgramClientsDashboard from "../ProgramDashboard/ProgramClientsDashboard";

type Row = {
  id?: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  email: string;
  user: User;
};

const createRowFromVaccineVoucherProgramEnrollment = (
  programEnrollment: ProgramEnrollment,
): Row => {
  const user = programEnrollment.user as ClientUser;

  return {
    id: programEnrollment._id,
    lastName: user.lastName,
    firstName: user.firstName,
    phoneNumber: user.phoneNumber,
    email: user.email,
    user,
  };
};

function getRows(programEnrollments: ProgramEnrollment[]): Row[] {
  return programEnrollments.map(createRowFromVaccineVoucherProgramEnrollment);
}

type VaccineVoucherClientDashboardProps = {
  vaccineVoucherProgramEnrollments: ProgramEnrollment[];
};

export default function VaccineVoucherClientDashboard({
  vaccineVoucherProgramEnrollments: VaccineVoucherProgramEnrollments,
}: VaccineVoucherClientDashboardProps): ReactNode {
  const rows = getRows(VaccineVoucherProgramEnrollments);

  return <ProgramClientsDashboard programName="Vaccine Voucher" rows={rows} />;
}
