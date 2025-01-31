"use client";

import { Search } from "@mui/icons-material";
import { Box, Snackbar, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

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
    lastName: user.lastName,
    firstName: user.firstName,
    phoneNumber: user.phoneNumber,
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
}: PendingApplicationDashboardProps) {
  const [rows, setRows] = useState(getRows(programEnrollments));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
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
      renderCell: (params) => {
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
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarMessage={setSnackbarMessage}
              />
              <RejectPendingApplicationButton
                programEnrollment={params.row.programEnrollment}
                rows={rows}
                setRows={setRows}
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarMessage={setSnackbarMessage}
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
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        />
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
