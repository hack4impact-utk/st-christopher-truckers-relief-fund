"use client";

import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ReactNode, useState } from "react";

import { ClientUser, Program, ProgramEnrollment } from "@/types";

import AdminDashboardTable, {
  AdminDashboardTableRow,
} from "../AdminDashboardTable";
import AcceptPendingApplicationButton from "./AcceptPendingApplicationButton";
import PendingApplicationInfoModal from "./PendingApplicationInfoModal";
import RejectPendingApplicationButton from "./RejectPendingApplicationButton";

export type PendingApplicationsRow = AdminDashboardTableRow & {
  program: Program;
  programEnrollment: ProgramEnrollment;
};

const createRowFromProgramEnrollment = (
  programEnrollment: ProgramEnrollment,
): PendingApplicationsRow => {
  const user = programEnrollment.user as ClientUser;
  return {
    id: programEnrollment._id,
    lastName: user.lastName,
    firstName: user.firstName,
    phoneNumber: user.phoneNumber,
    email: user.email,
    program: programEnrollment.program,
    programEnrollment: programEnrollment,
  };
};

function getRows(
  programEnrollments: ProgramEnrollment[],
): PendingApplicationsRow[] {
  return programEnrollments.map(createRowFromProgramEnrollment);
}

type PendingApplicationDashboardProps = {
  programEnrollments: ProgramEnrollment[];
};

export default function PendingApplicationDashboard({
  programEnrollments,
}: PendingApplicationDashboardProps): ReactNode {
  const [rows, setRows] = useState(getRows(programEnrollments));

  const additionalColumns: GridColDef<PendingApplicationsRow>[] = [
    {
      field: "program",
      headerName: "Program",
      width: 250,
    },
    {
      field: "action",
      headerName: "Actions",
      sortable: false,
      minWidth: 350,
      flex: 1,
      renderCell: (params): ReactNode => {
        const user = params.row.programEnrollment.user as ClientUser;
        return (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                height: "100%",
              }}
            >
              <AcceptPendingApplicationButton
                programEnrollment={params.row.programEnrollment}
                rows={rows}
                setRows={setRows}
              />
              <RejectPendingApplicationButton
                programEnrollment={params.row.programEnrollment}
                rows={rows}
                setRows={setRows}
              />
              <PendingApplicationInfoModal
                enrollmentForm={user.enrollmentForm}
              />
            </Box>
          </>
        );
      },
    },
  ];

  return (
    <Box sx={{ width: "95%", height: "75%", marginTop: "100px" }}>
      <AdminDashboardTable
        tableName="Pending Applications"
        rows={rows}
        additionalColumns={additionalColumns}
      />
    </Box>
  );
}
