import { GridColDef } from "@mui/x-data-grid";
import { ReactNode } from "react";

import { ClientUser, FagerstromTest, ProgramEnrollment, User } from "@/types";

import AdminDashboardTable, {
  AdminDashboardTableRow,
} from "../AdminDashboardTable";
import FagerstromTestHistoryModal from "./FagerstromTestHistoryModal";

type RigsWithoutCigRow = AdminDashboardTableRow & {
  fagerstromTests: FagerstromTest[];
  programEnrollment: ProgramEnrollment;
  user: User;
};

const createRowFromRigsWithoutCigsProgramEnrollment = (
  programEnrollment: ProgramEnrollment,
): RigsWithoutCigRow => {
  const user = programEnrollment.user as ClientUser;

  return {
    id: programEnrollment._id,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    email: user.email,
    fagerstromTests: user.fagerstromTests,
    programEnrollment,
    user,
  };
};

function getRows(programEnrollments: ProgramEnrollment[]): RigsWithoutCigRow[] {
  return programEnrollments.map(createRowFromRigsWithoutCigsProgramEnrollment);
}

type RigsWithoutCigsClientDashboardProps = {
  rigsWithoutCigsProgramEnrollments: ProgramEnrollment[];
};

export default function RigsWithoutCigsClientDashboard({
  rigsWithoutCigsProgramEnrollments,
}: Readonly<RigsWithoutCigsClientDashboardProps>): ReactNode {
  const rows = getRows(rigsWithoutCigsProgramEnrollments);

  const additionalColumns: GridColDef<RigsWithoutCigRow>[] = [
    {
      field: "history",
      headerName: "View history",
      sortable: false,
      align: "center",
      flex: 1,
      minWidth: 100,
      renderCell: (params): ReactNode => {
        return (
          <FagerstromTestHistoryModal
            initialFagerstromTests={params.row.fagerstromTests}
            programEnrollment={params.row.programEnrollment}
            user={params.row.user}
          />
        );
      },
    },
  ];

  return (
    <AdminDashboardTable
      tableName="Rigs Without Cigs Clients"
      rows={rows}
      additionalColumns={additionalColumns}
    />
  );
}
