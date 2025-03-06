"use client";

import { Search } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { ReactNode, useState } from "react";

import {
  handleScreeningRequestDeletion,
  handleScreeningRequestUpdate,
} from "@/server/api/screening-requests.ts/public-mutations";
import { ScreeningRequest, ScreeningRequestStatus } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

type ScreeningRequestManagementTableProps = {
  screeningRequests: ScreeningRequest[];
};

type Row = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  requestName: string;
  submittedDate: string;
  status: string;
  screeningRequest: ScreeningRequest;
};

function getStatusDisplayName(status: ScreeningRequestStatus): string {
  switch (status) {
    case "requested":
      return "Requested";
    case "qualified":
      return "Awaiting client reporting";
    case "rejected":
      return "Rejected";
    case "negative":
      return "Negative test result";
    case "initial positive":
      return "First test was positive; awaiting follow-up";
    case "true positive":
      return "True positive";
    case "false positive":
      return "False positive";
    default:
      return "Unknown";
  }
}

function getRowFromScreeningRequest(screeningRequest: ScreeningRequest): Row {
  return {
    id: screeningRequest._id!,
    firstName: screeningRequest.user.firstName,
    lastName: screeningRequest.user.lastName,
    phoneNumber: screeningRequest.user.phoneNumber,
    email: screeningRequest.user.email,
    requestName: screeningRequest.name,
    submittedDate: dayjsUtil(screeningRequest.submittedDate).format(
      "MM/DD/YYYY",
    ),
    status: getStatusDisplayName(screeningRequest.status),
    screeningRequest,
  };
}

function getRows(screeningRequests: ScreeningRequest[]): Row[] {
  return screeningRequests.map(getRowFromScreeningRequest);
}

export default function ScreeningRequestManagementTable({
  screeningRequests,
}: ScreeningRequestManagementTableProps): ReactNode {
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState(getRows(screeningRequests));
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = async (
    screeningRequest: ScreeningRequest,
  ): Promise<void> => {
    const confirm = window.confirm(
      "Are you sure you want to delete this screening request?",
    );

    if (!confirm) {
      return;
    }

    setRows((prevRows) =>
      prevRows.filter((prevRow) => prevRow.id !== screeningRequest._id),
    );

    const [, error] = await handleScreeningRequestDeletion(screeningRequest);

    if (error !== null) {
      enqueueSnackbar("An unexpected error occurred.");
    } else {
      enqueueSnackbar("Screening request deleted successfully.");
    }
  };

  const handleUpdate = async (
    newScreeningRequest: ScreeningRequest,
    confirmationMessage: string,
  ): Promise<void> => {
    const confirm = window.confirm(confirmationMessage);

    if (!confirm) {
      return;
    }

    setRows((prevRows) =>
      prevRows.map((prevRow) =>
        prevRow.id === newScreeningRequest._id
          ? getRowFromScreeningRequest(newScreeningRequest)
          : prevRow,
      ),
    );

    const [, error] = await handleScreeningRequestUpdate(newScreeningRequest);

    if (error !== null) {
      enqueueSnackbar("An unexpected error occurred.");
    } else {
      enqueueSnackbar("Screening request updated successfully.");
    }
  };

  function getActionButton(row: Row): ReactNode {
    const { screeningRequest } = row;

    switch (screeningRequest.status) {
      case "requested":
        return (
          <>
            <Button
              variant="contained"
              color="success"
              onClick={() =>
                handleUpdate(
                  { ...screeningRequest, status: "qualified" },
                  "Are you sure you want to approve this request?",
                )
              }
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() =>
                handleUpdate(
                  { ...screeningRequest, status: "rejected" },
                  "Are you sure you want to reject this request?",
                )
              }
            >
              Reject
            </Button>
          </>
        );
      case "qualified":
        return <></>;
      case "rejected":
        return <></>;
      case "negative":
        return <></>;
      case "initial positive":
        return <></>;
      case "true positive":
        return <></>;
      case "false positive":
        return <></>;
      default:
        return <></>;
    }
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
      field: "requestName",
      headerName: "Request Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "submittedDate",
      headerName: "Submitted Date",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 300,
    },
    {
      field: "action",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      minWidth: 350,
      renderCell: (params): ReactNode => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: 2,
              alignItems: "center",
              height: "100%",
            }}
          >
            {getActionButton(params.row)}
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDelete(params.row.screeningRequest)}
            >
              <DeleteIcon />
            </Button>
          </Box>
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
        <Typography align="center" variant="h6">
          Screening Requests
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
