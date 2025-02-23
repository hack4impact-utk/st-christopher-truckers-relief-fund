"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import Search from "@mui/icons-material/Search";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { ReactNode, useState } from "react";

import { handleDeleteUrgentMeetingRequest } from "@/server/api/urgent-meeting-requests/public-mutations";
import { ClientUser, UrgentMeetingRequest } from "@/types";

type Row = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  reason: string;
  client: ClientUser;
};

function createRowFromUrgentMeetingRequest(
  urgentMeetingRequest: UrgentMeetingRequest,
): Row {
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

function getRows(urgentMeetingRequests: UrgentMeetingRequest[]): Row[] {
  return urgentMeetingRequests.map(createRowFromUrgentMeetingRequest);
}

type UrgentMeetingRequestsProps = {
  urgentMeetingRequests: UrgentMeetingRequest[];
};

export default function UrgentMeetingRequests({
  urgentMeetingRequests,
}: UrgentMeetingRequestsProps): ReactNode {
  const [rows, setRows] = useState(getRows(urgentMeetingRequests));
  const [searchQuery, setSearchQuery] = useState("");
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
    <>
      <Box>
        <Typography align="center" variant="h4" sx={{ m: 2 }}>
          Urgent Meeting Requests
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
