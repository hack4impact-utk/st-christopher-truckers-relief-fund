import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ReactNode } from "react";

import { ClientUser, ProgramEnrollment } from "@/types";

import AdminDashboardTable, {
  AdminDashboardTableRow,
} from "../AdminDashboardTable";
import GetPreventativeScreeningsHistoryModal from "./GetPreventativeScreeningsHistoryModal";

type GetPreventativeScreeningsRow = AdminDashboardTableRow & {
  user: ClientUser;
};

const createRowFromGetPreventativeScreeningsProgramEnrollment = (
  programEnrollment: ProgramEnrollment,
): GetPreventativeScreeningsRow => {
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

function getRows(
  programEnrollments: ProgramEnrollment[],
): GetPreventativeScreeningsRow[] {
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
}: Readonly<GetPreventativeScreeningsClientDashboardProps>): ReactNode {
  const rows = getRows(GetPreventativeScreeningProgramEnrollments);

  const additionalColumns: GridColDef<GetPreventativeScreeningsRow>[] = [
    {
      field: "History",
      headerName: "History",
      flex: 1,
      minWidth: 100,
      renderCell: (params): ReactNode => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: 2,
              alignItems: "center",
              height: "100%",
            }}
          >
            <GetPreventativeScreeningsHistoryModal
              initialScreeningRequests={params.row.user.screeningRequests}
            />
          </Box>
        );
      },
    },
  ];

  return (
    <AdminDashboardTable
      tableName="Get Preventative Screenings Clients"
      rows={rows}
      additionalColumns={additionalColumns}
    />
  );
}
