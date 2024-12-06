"use client";

import { Box, Button, Snackbar } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

import AcceptPendingApplicationButton from "@/components/AdminDashboard/PendingApplicationDashboard/AcceptPendingApplicationButton";
import RejectPendingApplicationButton from "@/components/AdminDashboard/PendingApplicationDashboard/RejectPendingApplicationButton";
import InvitationInfoModal from "@/components/AdminDashboard/PendingApplicationDashboard/InvitationInfoModal";
import { EnrollmentForm, Program, ProgramEnrollment } from "@/types";

export type Row = {
  id?: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  email: string;
  program: Program;
  enrollmentForm: EnrollmentForm;
};

const createRowFromProgramEnrollment = (
  programEnrollment: ProgramEnrollment,
): Row => {
  return {
    id: programEnrollment._id,
    lastName:
      programEnrollment.enrollmentForm.generalInformationSection.lastName,
    firstName:
      programEnrollment.enrollmentForm.generalInformationSection.firstName,
    phoneNumber:
      programEnrollment.enrollmentForm.generalInformationSection.phoneNumber,
    email: programEnrollment.email,
    program: programEnrollment.program,
    enrollmentForm: programEnrollment.enrollmentForm,
  };
};

function getRows(programEnrollments: ProgramEnrollment[]): Row[] {
  return programEnrollments.map(createRowFromProgramEnrollment);
}

type PendingApplicationDashboardProps = {
  programEnrollments: ProgramEnrollment[];
};

export default function PendingApplicationDashboard({
  programEnrollments,
}: PendingApplicationDashboardProps) {
  const [rows, setRows] = useState(getRows(programEnrollments));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const columns: GridColDef<Row>[] = [
    {
      field: "firstName",
      headerName: "First name",
      width: 200,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 200,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 125,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "program",
      headerName: "Program",
      width: 250,
    },
    {
      field: "action",
      headerName: "",
      sortable: false,
      minWidth: 350,
      flex: 1,
      renderCell: (params) => {
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
                email={
                  params.row.enrollmentForm.generalInformationSection.email
                }
                firstName={params.row.firstName}
                program={params.row.program}
                rows={rows}
                setRows={setRows}
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarMessage={setSnackbarMessage}
              />
              <RejectPendingApplicationButton
                email={
                  params.row.enrollmentForm.generalInformationSection.email
                }
                program={params.row.program}
                rows={rows}
                setRows={setRows}
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarMessage={setSnackbarMessage}
              />
              <InvitationInfoModal enrollmentForm={params.row.enrollmentForm} />
            </Box>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Box sx={{ width: "95%" }}>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        />
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 7,
              },
            },
          }}
        />
      </Box>
    </>
  );
}
