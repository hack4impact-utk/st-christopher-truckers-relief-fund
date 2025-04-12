import { GridColDef } from "@mui/x-data-grid";
import { Dispatch, ReactNode, SetStateAction } from "react";

import { ClientUser, FagerstromTest, ProgramEnrollment, User } from "@/types";
import { RigsWithoutCigsStatus } from "@/types/RigsWithoutCigsStatus";

import AdminDashboardTable, {
  AdminDashboardTableRow,
} from "../AdminDashboardTable";
import FagerstromTestHistoryModal from "./FagerstromTestHistoryModal";
import UpdateStatusForm from "./UpdateStatusForm";

type RigsWithoutCigRow = AdminDashboardTableRow & {
  fagerstromTests: FagerstromTest[];
  programEnrollment: ProgramEnrollment;
  user: User;
  rigsWithoutCigsStatus: string;
};

function getRigsWithoutCigsStatusDisplayName(
  status: RigsWithoutCigsStatus,
): string {
  switch (status) {
    case "unknown":
      return "Unknown";
    case "quit":
      return "Quit";
    case "cut back":
      return "Cut back";
    case "in progress":
      return "In progress";
    case "no success":
      return "No success";
    case "not yet started":
      return "Not yet started";
    case "withdrawn":
      return "Withdrawn";
  }
}

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
    rigsWithoutCigsStatus: getRigsWithoutCigsStatusDisplayName(
      user.rigsWithoutCigsStatus,
    ),
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
  setProgramEnrollments: Dispatch<SetStateAction<ProgramEnrollment[]>>;
};

export default function RigsWithoutCigsClientDashboard({
  rigsWithoutCigsProgramEnrollments,
  setProgramEnrollments,
}: Readonly<RigsWithoutCigsClientDashboardProps>): ReactNode {
  const rows = getRows(rigsWithoutCigsProgramEnrollments);

  const additionalColumns: GridColDef<RigsWithoutCigRow>[] = [
    {
      field: "rigsWithoutCigsStatus",
      headerName: "Status",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "updateStatus",
      headerName: "Update status",
      sortable: false,
      align: "center",
      flex: 1,
      minWidth: 100,
      renderCell: (params): ReactNode => {
        return (
          <UpdateStatusForm
            user={params.row.user as ClientUser}
            setProgramEnrollments={setProgramEnrollments}
            rowId={params.row.id!}
          />
        );
      },
    },
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
