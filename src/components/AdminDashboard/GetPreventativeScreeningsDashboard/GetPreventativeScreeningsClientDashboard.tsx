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

const createRowFromGetPreventativeScreeningsProgramEnrollment = (
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
  return programEnrollments.map(
    createRowFromGetPreventativeScreeningsProgramEnrollment,
  );
}

type GetPreventativeScreeningsClientDashboardProps = {
  getPreventativeScreeningProgramEnrollments: ProgramEnrollment[];
};

export default function GetPreventativeScreeningsClientDashboard({
  getPreventativeScreeningProgramEnrollments:
    GetPreventativeScreeningProgramEnrollments,
}: GetPreventativeScreeningsClientDashboardProps): ReactNode {
  const rows = getRows(GetPreventativeScreeningProgramEnrollments);

  return (
    <ProgramClientsDashboard
      programName="Get Preventative Screenings"
      rows={rows}
    />
  );
}
