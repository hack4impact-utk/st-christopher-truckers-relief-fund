"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { ReactNode, useState } from "react";

import {
  handleScreeningRequestDeletion,
  handleScreeningRequestUpdate,
} from "@/server/api/screening-requests.ts/public-mutations";
import { ScreeningRequest, ScreeningRequestStatus } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

import AdminDashboardTable from "../AdminDashboardTable";

type ScreeningRequestManagementTableProps = {
  screeningRequests: ScreeningRequest[];
};

type ScreeningRequestRow = {
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

function getRowFromScreeningRequest(
  screeningRequest: ScreeningRequest,
): ScreeningRequestRow {
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

function getRows(screeningRequests: ScreeningRequest[]): ScreeningRequestRow[] {
  return screeningRequests.map(getRowFromScreeningRequest);
}

export default function ScreeningRequestManagementTable({
  screeningRequests,
}: ScreeningRequestManagementTableProps): ReactNode {
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState(getRows(screeningRequests));

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

  function getActionButton(row: ScreeningRequestRow): ReactNode {
    const { screeningRequest } = row;

    if (screeningRequest.status === "requested") {
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
    }

    return <></>;
  }

  const additionalColumns: GridColDef<ScreeningRequestRow>[] = [
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

  return (
    <AdminDashboardTable
      tableName="Screening Requests"
      rows={rows}
      additionalColumns={additionalColumns}
      width="80vw"
    />
  );
}
