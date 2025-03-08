import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { ReactNode, useState } from "react";

import {
  handleVaccineVoucherRequestDeletion,
  handleVaccineVoucherRequestUpdate,
} from "@/server/api/vaccine-voucher-requests/public-mutations";
import { VaccineVoucherRequest, VaccineVoucherRequestStatus } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

import AdminDashboardTable, {
  AdminDashboardTableRow,
} from "../AdminDashboardTable";

type VaccineVoucherRequestRow = AdminDashboardTableRow & {
  vaccineName: string;
  pharmacyName: string;
  submittedDate: string;
  status: string;
  vaccineVoucherRequest: VaccineVoucherRequest;
};

function getStatusDisplayName(status: VaccineVoucherRequestStatus): string {
  switch (status) {
    case "requested":
      return "Requested";
    case "rejected":
      return "Rejected";
    case "approved":
      return "Approved and awaiting client confirmation of receival";
    case "received":
      return "Received and awaiting client confirmation of use";
    case "used":
      return "Used";
    default:
      return "Unknown";
  }
}

function getRowFromVaccineVoucherRequest(
  vaccineVoucherRequest: VaccineVoucherRequest,
): VaccineVoucherRequestRow {
  return {
    id: vaccineVoucherRequest._id!,
    firstName: vaccineVoucherRequest.user.firstName,
    lastName: vaccineVoucherRequest.user.lastName,
    phoneNumber: vaccineVoucherRequest.user.phoneNumber,
    email: vaccineVoucherRequest.user.email,
    vaccineName: vaccineVoucherRequest.vaccineName,
    pharmacyName: vaccineVoucherRequest.pharmacyName,
    submittedDate: dayjsUtil(vaccineVoucherRequest.submittedDate).format(
      "MM/DD/YYYY",
    ),
    status: getStatusDisplayName(vaccineVoucherRequest.status),
    vaccineVoucherRequest,
  };
}

function getRows(
  vaccineVoucherRequests: VaccineVoucherRequest[],
): VaccineVoucherRequestRow[] {
  return vaccineVoucherRequests.map(getRowFromVaccineVoucherRequest);
}

function getActionButtons(
  row: VaccineVoucherRequestRow,
  handleUpdate: (
    screeningRequest: VaccineVoucherRequest,
    confirmationMessage: string,
  ) => Promise<void>,
): ReactNode {
  const { vaccineVoucherRequest } = row;

  if (vaccineVoucherRequest.status === "requested") {
    return (
      <>
        <Button
          variant="contained"
          color="success"
          onClick={() =>
            handleUpdate(
              {
                ...vaccineVoucherRequest,
                status: "approved",
              },
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
              {
                ...vaccineVoucherRequest,
                status: "rejected",
              },
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

type VaccineVoucherRequestsTableProps = {
  vaccineVoucherRequests: VaccineVoucherRequest[];
};

export default function VaccineVoucherRequestsTable({
  vaccineVoucherRequests,
}: VaccineVoucherRequestsTableProps): ReactNode {
  const [rows, setRows] = useState(getRows(vaccineVoucherRequests));
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async (
    vaccineVoucherRequest: VaccineVoucherRequest,
  ): Promise<void> => {
    const confirm = window.confirm(
      "Are you sure you want to delete this vaccine voucher request?",
    );

    if (!confirm) {
      return;
    }

    const [, error] = await handleVaccineVoucherRequestDeletion(
      vaccineVoucherRequest,
    );

    setRows((prevRows) =>
      prevRows.filter((prevRow) => prevRow.id !== vaccineVoucherRequest._id),
    );

    if (error !== null) {
      enqueueSnackbar("An unexpected error occurred.", {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Vaccine voucher request deleted successfully.", {
        variant: "success",
      });
    }
  };

  const handleUpdate = async (
    newVaccineVoucherRequest: VaccineVoucherRequest,
    confirmationMessage: string,
  ): Promise<void> => {
    const confirm = window.confirm(confirmationMessage);

    if (!confirm) {
      return;
    }

    const [, error] = await handleVaccineVoucherRequestUpdate(
      newVaccineVoucherRequest,
    );

    setRows((prevRows) =>
      prevRows.map((prevRow) =>
        prevRow.id === newVaccineVoucherRequest._id
          ? getRowFromVaccineVoucherRequest(newVaccineVoucherRequest)
          : prevRow,
      ),
    );

    if (error !== null) {
      enqueueSnackbar("An unexpected error occurred.", {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Vaccine voucher request updated successfully.", {
        variant: "success",
      });
    }
  };

  const additionalColumns: GridColDef<VaccineVoucherRequestRow>[] = [
    {
      field: "vaccineName",
      headerName: "Vaccine",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "pharmacyName",
      headerName: "Pharmacy",
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
            {getActionButtons(params.row, handleUpdate)}
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDelete(params.row.vaccineVoucherRequest)}
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
      tableName="Vaccine Voucher Requests"
      rows={rows}
      additionalColumns={additionalColumns}
      width="80vw"
    />
  );
}
