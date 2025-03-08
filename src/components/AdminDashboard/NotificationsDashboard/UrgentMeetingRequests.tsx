"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { ReactNode, useState } from "react";

import { handleDeleteUrgentMeetingRequest } from "@/server/api/urgent-meeting-requests/public-mutations";
import { ClientUser, UrgentMeetingRequest } from "@/types";

import AdminDashboardTable, {
  AdminDashboardTableRow,
} from "../AdminDashboardTable";

type UrgentMeetingRequestRow = AdminDashboardTableRow & {
  reason: string;
  client: ClientUser;
};

function createRowFromUrgentMeetingRequest(
  urgentMeetingRequest: UrgentMeetingRequest,
): UrgentMeetingRequestRow {
  const client = urgentMeetingRequest.client as ClientUser;

  return {
    id: urgentMeetingRequest._id,
    firstName: client.firstName,
    lastName: client.lastName,
    email: client.email,
    phoneNumber: client.phoneNumber,
    reason: urgentMeetingRequest.reason,
    client,
  };
}

function getRows(
  urgentMeetingRequests: UrgentMeetingRequest[],
): UrgentMeetingRequestRow[] {
  return urgentMeetingRequests.map(createRowFromUrgentMeetingRequest);
}

type UrgentMeetingRequestsProps = {
  urgentMeetingRequests: UrgentMeetingRequest[];
};

export default function UrgentMeetingRequests({
  urgentMeetingRequests,
}: UrgentMeetingRequestsProps): ReactNode {
  const [rows, setRows] = useState(getRows(urgentMeetingRequests));
  const { enqueueSnackbar } = useSnackbar();

  async function handleDelete(id: string): Promise<void> {
    const confirm = window.confirm(
      "Are you sure you want to delete this urgent meeting request?",
    );

    if (!confirm) {
      return;
    }

    setRows((prevRows) => prevRows.filter((prevRow) => prevRow.id !== id));

    const [, error] = await handleDeleteUrgentMeetingRequest(id);

    if (error !== null) {
      enqueueSnackbar(
        "There was an error deleting the urgent meeting request",
        {
          variant: "error",
        },
      );
      return;
    }

    enqueueSnackbar("Urgent meeting request deleted successfully", {
      variant: "success",
    });
  }

  const additionalColumns: GridColDef<UrgentMeetingRequestRow>[] = [
    {
      field: "reason",
      headerName: "Reason",
      sortable: false,
      flex: 1,
      minWidth: 100,
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      flex: 1,
      minWidth: 100,
      renderCell: (params): ReactNode => {
        return (
          <IconButton
            onClick={async () => {
              await handleDelete(params.row.id!);
            }}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <AdminDashboardTable
      tableName="Urgent Meeting Requests"
      rows={rows}
      additionalColumns={additionalColumns}
    />
  );
}
