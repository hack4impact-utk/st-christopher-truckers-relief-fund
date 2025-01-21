"use client";

import { Search } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Box, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

import { ClientUser, ProgramEnrollment } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";
import getClosestPastSunday from "@/utils/getClosestPastSunday";

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
    const latestFormSubmission = user.healthyHabitsTrackingForms[0];
    const latestFormSubmissionWeek = dayjsUtil(
      latestFormSubmission.weekOfSubmission,
    );

    const lastSunday = getClosestPastSunday();

    completed = latestFormSubmissionWeek.isSame(lastSunday, "day");
  }

  return {
    id: programEnrollment._id,
    lastName: user.lastName,
    firstName: user.firstName,
    phoneNumber: user.enrollmentForm.generalInformationSection.phoneNumber,
    email: user.email,
    completed,
  };
};

function getRows(programEnrollments: ProgramEnrollment[]): Row[] {
  return programEnrollments.map(createRowFromHealthyHabitsProgramEnrollment);
}

type HealthyHabitsClientDashboardProps = {
  healthyHabitsProgramEnrollments: ProgramEnrollment[];
};

export default function HealthyHabitsClientDashboard({
  healthyHabitsProgramEnrollments,
}: HealthyHabitsClientDashboardProps) {
  const rows = getRows(healthyHabitsProgramEnrollments);
  const [searchQuery, setSearchQuery] = useState("");

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
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
    },
    {
      field: "competed",
      headerName: "Completed tracking form this week?",
      sortable: false,
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
      row.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <Box>
        <Typography align="center" variant="h4" sx={{ m: 2 }}>
          Healthy Habits Clients
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
