"use client";

import { Search } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Box, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

import { ClientUser, ProgramEnrollment } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

export type Row = {
  id?: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  email: string;
  completed: boolean;
};

const createRowFromHealthyHabitsProgramEnrollment = (
  programEnrollment: ProgramEnrollment,
): Row => {
  const user = programEnrollment.user as ClientUser;

  let completed = false;

  if (user.healthyHabitsTrackingForms.length > 0) {
    const date = dayjsUtil(user.healthyHabitsTrackingForms[0]?.submittedDate);
    const lastSunday = dayjsUtil()
      .subtract(dayjsUtil().day(), "day")
      .startOf("day");

    completed = date.isSame(lastSunday, "day");
  }

  return {
    id: programEnrollment._id,
    lastName: user.lastName,
    firstName: user.firstName,
    // phoneNumber: user.enrollmentForm.generalInformationSection.phoneNumber,
    email: user.email,
    completed,
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
    {
      field: "competed",
      headerName: "Completed",
      sortable: false,
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        const completed = params.row.completed;

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
              {completed ? <CheckIcon /> : <CloseIcon />}
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
      // row.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <Box sx={{ width: "95%", height: "75%" }}>
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
