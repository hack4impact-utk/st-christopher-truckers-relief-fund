import DeleteIcon from "@mui/icons-material/Delete";
import Search from "@mui/icons-material/Search";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { ReactNode, useState } from "react";

import { handleDeleteScheduledMeeting } from "@/server/api/scheduled-meetings/public-mutations";
import { ClientUser, ScheduledMeeting } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

import CreateNewMeeting from "./CreateNewMeeting";

export type Row = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  reason: string;
  date: string;
};

export function createRowFromScheduledMeeting(
  scheduledMeeting: ScheduledMeeting,
): Row {
  return {
    id: scheduledMeeting._id,
    firstName: scheduledMeeting.client.firstName,
    lastName: scheduledMeeting.client.lastName,
    email: scheduledMeeting.client.email,
    phoneNumber:
      scheduledMeeting.client.enrollmentForm.generalInformationSection
        .phoneNumber,
    reason: scheduledMeeting.reason,
    date: dayjsUtil(scheduledMeeting.date).local().format("MM/DD/YYYY HH:mm A"),
  };
}

function getRows(scheduledMeetings: ScheduledMeeting[]): Row[] {
  return scheduledMeetings.map(createRowFromScheduledMeeting);
}

type ScheduledMeetingsProps = {
  scheduledMeetings: ScheduledMeeting[];
  allClients: ClientUser[];
};

export default function ScheduledMeetings({
  scheduledMeetings,
  allClients,
}: ScheduledMeetingsProps): ReactNode {
  const [rows, setRows] = useState(getRows(scheduledMeetings));
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredRows = rows.filter(
    (row) =>
      row.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Box>
      <Typography align="center" variant="h4" sx={{ m: 2 }}>
        Scheduled Meetings
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
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
        <Box sx={{ marginLeft: "auto" }}>
          <CreateNewMeeting allClients={allClients} setRows={setRows} />
        </Box>
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
  );
}
