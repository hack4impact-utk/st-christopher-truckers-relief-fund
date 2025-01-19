"use client";

import { Search } from "@mui/icons-material";
import { Box, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

import { ClientUser, ProgramEnrollment } from "@/types";

export type Row = {
  id?: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  email: string;
};

const createRowFromHealthyHabitsProgramEnrollment = (
  programEnrollment: ProgramEnrollment,
): Row => {
  const user = programEnrollment.user as ClientUser;
  return {
    id: programEnrollment._id,
    lastName: user.lastName,
    firstName: user.firstName,
    // phoneNumber: user.enrollmentForm.generalInformationSection.phoneNumber,
    email: user.email,
  };
};

function getRows(programEnrollments: ProgramEnrollment[]): Row[] {
  return programEnrollments.map(createRowFromHealthyHabitsProgramEnrollment);
}

type HealthyHabitsClientDashboardProps = {
  healthHabitsProgramEnrollments: ProgramEnrollment[];
};

export default function HealthyHabitsClientDashboard({
  healthHabitsProgramEnrollments,
}: HealthyHabitsClientDashboardProps) {
  const rows = getRows(healthHabitsProgramEnrollments);
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
  ];

  const filteredRows = rows.filter(
    (row) =>
      row.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      // row.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <Box sx={{ width: "95%", height: "75%", marginTop: "100px" }}>
        <Typography align="center" variant="h4" sx={{ m: 2 }}>
          Health Habits
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
