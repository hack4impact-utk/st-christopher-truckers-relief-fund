"use client";

import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { EnrollmentForm, Program, ProgramEnrollment } from "@/types";

type Row = {
  id?: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  email: string;
  program: Program;
  enrollmentForm: EnrollmentForm;
};

const columns: GridColDef<Row>[] = [
  {
    field: "firstName",
    headerName: "First name",
    flex: 1,
  },
  {
    field: "lastName",
    headerName: "Last name",
    flex: 1,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    flex: 2,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 2,
  },
  {
    field: "program",
    headerName: "Program",
    flex: 2,
  },
  {
    field: "action",
    headerName: "",
    sortable: false,
    flex: 3,
    renderCell: (params) => {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Button color="success" variant="contained">
            Accept
          </Button>
          <Button color="error" variant="contained">
            Reject
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              alert(JSON.stringify(params.row.enrollmentForm));
            }}
          >
            Info
          </Button>
        </Box>
      );
    },
  },
];

const createRowFromProgramEnrollment = (
  programEnrollment: ProgramEnrollment,
) => {
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

type PendingApplicationDashboardProps = {
  programEnrollments: ProgramEnrollment[] | null;
};

export default function PendingApplicationDashboard({
  programEnrollments,
}: PendingApplicationDashboardProps) {
  const rows = programEnrollments
    ? programEnrollments.map((programEnrollment) =>
        createRowFromProgramEnrollment(programEnrollment),
      )
    : [];

  return (
    <>
      <Box sx={{ width: "90%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
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
