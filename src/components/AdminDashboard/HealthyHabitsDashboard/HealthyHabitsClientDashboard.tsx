"use client";

import Alarm from "@mui/icons-material/Alarm";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Search from "@mui/icons-material/Search";
import Warning from "@mui/icons-material/Warning";
import { Box, TextField, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ReactNode, useState } from "react";

import {
  ClientUser,
  HealthyHabitsTrackingForm,
  ProgramEnrollment,
  User,
} from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";
import getClosestPastSunday from "@/utils/getClosestPastSunday";

import HealthyHabitsHistoryModal from "./HealthyHabitsHistoryModal";

type ActivityStatus =
  | "complete"
  | "waiting"
  | "inactiveFor4Weeks"
  | "inactiveFor8Weeks"
  | "noTrackingForms";

export type Row = {
  id?: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  email: string;
  trackingForms: HealthyHabitsTrackingForm[];
  activityStatus: ActivityStatus;
  user: User;
};

const createRowFromHealthyHabitsProgramEnrollment = (
  programEnrollment: ProgramEnrollment,
): Row => {
  const user = programEnrollment.user as ClientUser;

  let status: ActivityStatus = "noTrackingForms";

  if (user.healthyHabitsTrackingForms.length > 0) {
    const latestFormSubmission = user.healthyHabitsTrackingForms[0];
    const latestFormSubmissionWeek = dayjsUtil(
      latestFormSubmission.weekOfSubmission,
    );
    const lastSunday = getClosestPastSunday();

    const lastSundayDayJs = dayjsUtil(lastSunday);

    if (latestFormSubmissionWeek.isSame(lastSunday, "day")) {
      status = "complete";
    } else if (lastSundayDayJs.diff(latestFormSubmissionWeek, "week") >= 8) {
      status = "inactiveFor8Weeks";
    } else if (lastSundayDayJs.diff(latestFormSubmissionWeek, "week") >= 4) {
      status = "inactiveFor4Weeks";
    } else if (latestFormSubmissionWeek.isBefore(lastSunday, "day")) {
      status = "waiting";
    }
  }

  return {
    id: programEnrollment._id,
    lastName: user.lastName,
    firstName: user.firstName,
    phoneNumber: user.phoneNumber,
    email: user.email,
    trackingForms: user.healthyHabitsTrackingForms,
    activityStatus: status,
    user,
  };
};

function getRows(programEnrollments: ProgramEnrollment[]): Row[] {
  return programEnrollments.map(createRowFromHealthyHabitsProgramEnrollment);
}

type HealthyHabitsClientDashboardProps = {
  healthyHabitsProgramEnrollments: ProgramEnrollment[];
};

function getStatusIcon(status: ActivityStatus): ReactNode {
  switch (status) {
    case "complete":
      return (
        <Tooltip title="Completed">
          <Check color="success" />
        </Tooltip>
      );
    case "waiting":
      return (
        <Tooltip title="Not submitted this week">
          <Alarm color="primary" />
        </Tooltip>
      );
    case "inactiveFor4Weeks":
      return (
        <Tooltip title="Inactive for 4 Weeks">
          <Warning color="warning" />
        </Tooltip>
      );
    case "inactiveFor8Weeks":
      return (
        <Tooltip title="Inactive for 8 Weeks">
          <Close color="error" />
        </Tooltip>
      );
    case "noTrackingForms":
      return (
        <Tooltip title="No tracking forms">
          <QuestionMarkIcon color="primary" />
        </Tooltip>
      );
  }
}

export default function HealthyHabitsClientDashboard({
  healthyHabitsProgramEnrollments,
}: HealthyHabitsClientDashboardProps): ReactNode {
  const rows = getRows(healthyHabitsProgramEnrollments);
  const [searchQuery, setSearchQuery] = useState("");

  const columns: GridColDef<Row>[] = [
    {
      field: "firstName",
      headerName: "First name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "lastName",
      headerName: "Last name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
      minWidth: 125,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
      minWidth: 200,
    },
    {
      field: "history",
      headerName: "View history",
      sortable: false,
      align: "center",
      flex: 1,
      minWidth: 100,
      renderCell: (params): ReactNode => {
        return (
          <HealthyHabitsHistoryModal
            initialForms={params.row.trackingForms}
            user={params.row.user}
          />
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      flex: 1,
      minWidth: 250,
      renderCell: (params): ReactNode => {
        const status = params.row.activityStatus;

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
              {getStatusIcon(status)}
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
