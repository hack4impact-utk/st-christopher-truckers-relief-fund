"use client";

import { Search } from "@mui/icons-material";
import { Box, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ReactNode, useState } from "react";

import { ClientUser, Program, ProgramEnrollment } from "@/types";

import AcceptPendingApplicationButton from "./AcceptPendingApplicationButton";
import PendingApplicationInfoModal from "./PendingApplicationInfoModal";
import RejectPendingApplicationButton from "./RejectPendingApplicationButton";

export type Row = {
  id?: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  email: string;
  program: Program;
  programEnrollment: ProgramEnrollment;
};

const createRowFromProgramEnrollment = (
  programEnrollment: ProgramEnrollment,
): Row => {
  const user = programEnrollment.user as ClientUser;
  return {
    id: programEnrollment._id,
    lastName: user.enrollmentForm.generalInformationSection.lastName,
    firstName: user.enrollmentForm.generalInformationSection.firstName,
    phoneNumber: user.enrollmentForm.generalInformationSection.phoneNumber,
    email: user.email,
    program: programEnrollment.program,
    programEnrollment: programEnrollment,
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
}: PendingApplicationDashboardProps): ReactNode {
  const [rows, setRows] = useState(getRows(programEnrollments));
  const [searchQuery, setSearchQuery] = useState("");

  const columns: GridColDef<Row>[] = [
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 125,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
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

  const filteredRows = rows.filter(
    (row) =>
      row.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <Box sx={{ width: "95%", height: "75%", marginTop: "100px" }}>
        <Typography align="center" variant="h4" sx={{ m: 2 }}>
          Pending Applications
        </Typography>
        <Box display="flex" alignItems="center" sx={{ py: 2 }}>
          <TextField
            id="search-bar"
            className="text"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            placeholder="Search..."
            size="small"
          />
          <Search sx={{ fontSize: 28, m: 1 }} color="primary" />
        </Box>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          disableRowSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          sx={{
            height: "300px",
          }}
        />
      </Box>
    </>
  );
}
