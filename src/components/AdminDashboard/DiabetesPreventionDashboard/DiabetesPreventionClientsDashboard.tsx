"use client";

import Alarm from "@mui/icons-material/Alarm";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Warning from "@mui/icons-material/Warning";
import { Box, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ReactNode } from "react";

import {
  ClientUser,
  HealthyHabitsTrackingForm,
  ProgramEnrollment,
  User,
} from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";
import getClosestPastSunday from "@/utils/getClosestPastSunday";

import AdminDashboardTable, {
  AdminDashboardTableRow,
} from "../AdminDashboardTable";
import DiabetesPreventionHistoryModal from "./DiabetesPreventionHistoryModal";

type ActivityStatus =
  | "complete"
  | "waiting"
  | "inactiveFor4Weeks"
  | "inactiveFor8Weeks"
  | "noTrackingForms";

type DiabetesPreventionRow = AdminDashboardTableRow & {
  trackingForms: HealthyHabitsTrackingForm[];
  activityStatus: ActivityStatus;
  user: User;
};

type DiabetesPreventionClientsDashboardProps = {
  diabetesPreventionProgramEnrollments: ProgramEnrollment[];
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

const createRow = (
  programEnrollment: ProgramEnrollment,
): DiabetesPreventionRow => {
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
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    email: user.email,
    trackingForms: user.healthyHabitsTrackingForms,
    activityStatus: status,
    user,
  };
};

export default function DiabetesPreventionClientsDashboard({
  diabetesPreventionProgramEnrollments,
}: Readonly<DiabetesPreventionClientsDashboardProps>): ReactNode {
  const rows = diabetesPreventionProgramEnrollments.map(createRow);

  const additionalColumns: GridColDef[] = [
    {
      field: "history",
      headerName: "View history",
      sortable: false,
      align: "center",
      flex: 1,
      minWidth: 100,
      renderCell: (params): ReactNode => {
        return (
          <DiabetesPreventionHistoryModal
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
        );
      },
    },
  ];

  return (
    <AdminDashboardTable
      tableName="Diabetes Prevention Clients"
      rows={rows}
      additionalColumns={additionalColumns}
    />
  );
}
