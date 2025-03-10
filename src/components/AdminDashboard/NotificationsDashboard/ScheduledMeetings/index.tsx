import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { ReactNode, useState } from "react";

import { handleDeleteScheduledMeeting } from "@/server/api/scheduled-meetings/public-mutations";
import { ClientUser, ScheduledMeeting } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

import AdminDashboardTable, {
  AdminDashboardTableRow,
} from "../../AdminDashboardTable";
import CreateNewMeeting from "./CreateNewMeeting";

export type ScheduledMeetingsRow = AdminDashboardTableRow & {
  reason: string;
  date: string;
};

export function createRowFromScheduledMeeting(
  scheduledMeeting: ScheduledMeeting,
): ScheduledMeetingsRow {
  return {
    id: scheduledMeeting._id,
    firstName: scheduledMeeting.client.firstName,
    lastName: scheduledMeeting.client.lastName,
    email: scheduledMeeting.client.email,
    phoneNumber: scheduledMeeting.client.phoneNumber,
    reason: scheduledMeeting.reason,
    date: dayjsUtil(scheduledMeeting.date)
      .local()
      .format("MM/DD/YYYY [at] hh:mm A"),
  };
}

function getRows(
  scheduledMeetings: ScheduledMeeting[],
): ScheduledMeetingsRow[] {
  return scheduledMeetings.map(createRowFromScheduledMeeting);
}

type ScheduledMeetingsProps = {
  scheduledMeetings: ScheduledMeeting[];
  allClients: ClientUser[];
};

export default function ScheduledMeetings({
  scheduledMeetings,
  allClients,
}: Readonly<ScheduledMeetingsProps>): ReactNode {
  const [rows, setRows] = useState(getRows(scheduledMeetings));
  const { enqueueSnackbar } = useSnackbar();

  async function handleDelete(id: string): Promise<void> {
    const confirm = window.confirm(
      "Are you sure you want to delete this scheduled meeting?",
    );

    if (!confirm) {
      return;
    }

    setRows((prevRows) => prevRows.filter((prevRow) => prevRow.id !== id));

    const [, error] = await handleDeleteScheduledMeeting(id);

    if (error !== null) {
      enqueueSnackbar(
        "There was an error deleting the scheduled meeting request",
        {
          variant: "error",
        },
      );
      return;
    }

    enqueueSnackbar("Scheduled meeting deleted successfully", {
      variant: "success",
    });
  }

  const additionalColumns: GridColDef<ScheduledMeetingsRow>[] = [
    {
      field: "reason",
      headerName: "Reason",
      sortable: false,
      flex: 1,
      minWidth: 100,
    },
    { field: "date", headerName: "Date", flex: 1, minWidth: 100 },
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
      tableName="Scheduled Meetings"
      rows={rows}
      additionalColumns={additionalColumns}
      actionButtons={
        <CreateNewMeeting allClients={allClients} setRows={setRows} />
      }
    />
  );
}
