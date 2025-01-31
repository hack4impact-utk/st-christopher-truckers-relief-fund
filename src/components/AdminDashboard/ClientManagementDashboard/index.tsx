"use client";

import { Search } from "@mui/icons-material";
import { Box, Snackbar, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

import ClientProgramManagementForm from "@/components/AdminDashboard/ClientManagementDashboard/ClientProgramManagementForm";
import PendingApplicationInfoModal from "@/components/AdminDashboard/PendingApplicationDashboard/PendingApplicationInfoModal/";
import { ClientUser, ProgramEnrollment } from "@/types";

export type Row = {
  id?: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  email: string;
  programEnrollments: ProgramEnrollment[];
  client: ClientUser;
};

const createRowFromClient = (client: ClientUser): Row => {
  return {
    id: client._id,
    lastName: client.lastName,
    firstName: client.firstName,
    phoneNumber: client.phoneNumber,
    email: client.email,
    programEnrollments: client.programEnrollments,
    client,
  };
};

function getRows(clients: ClientUser[]): Row[] {
  return clients.map(createRowFromClient);
}

type ClientManagementDashboardProps = {
  clients: ClientUser[];
};

export default function ClientManagementDashboard({
  clients,
}: ClientManagementDashboardProps) {
  const [rows] = useState(getRows(clients));
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
      field: "action",
      headerName: "Actions",
      sortable: false,
      minWidth: 350,
      flex: 1,
      renderCell: (params) => {
        const user = params.row.client;
        const fullName = user.firstName + " " + user.lastName;
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
              <PendingApplicationInfoModal
                enrollmentForm={user.enrollmentForm}
              />
              <ClientProgramManagementForm
                programEnrollments={params.row.programEnrollments}
                setSnackbarMessage={setSnackbarMessage}
                setSnackbarOpen={setSnackbarOpen}
                fullName={fullName}
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
      <Box sx={{ width: "95%", height: "75%", marginTop: "100px" }}>
        <Typography align="center" variant="h4" sx={{ m: 2 }}>
          Clients
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
