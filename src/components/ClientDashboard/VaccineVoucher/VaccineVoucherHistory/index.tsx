import { Box, Divider, List, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { Dispatch, ReactNode, SetStateAction } from "react";

import {
  handleVaccineVoucherRequestDeletion,
  handleVaccineVoucherRequestUpdate,
} from "@/server/api/vaccine-voucher-requests/public-mutations";
import { VaccineVoucherRequest } from "@/types";

import VaccineVoucherHistoryListItem from "./VaccineVoucherHistoryListItem";

type VaccineVoucherHistoryProps = {
  vaccineVoucherRequests: VaccineVoucherRequest[];
  setVaccineVoucherRequests: Dispatch<SetStateAction<VaccineVoucherRequest[]>>;
};

export default function VaccineVoucherHistory({
  vaccineVoucherRequests,
  setVaccineVoucherRequests,
}: VaccineVoucherHistoryProps): ReactNode {
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

    setVaccineVoucherRequests((prevRequests) =>
      prevRequests.filter(
        (prevRequest) => prevRequest._id !== vaccineVoucherRequest._id,
      ),
    );

    const [, error] = await handleVaccineVoucherRequestDeletion(
      vaccineVoucherRequest,
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

    setVaccineVoucherRequests((prevRequests) =>
      prevRequests.map((prevRequest) => {
        if (prevRequest._id === newVaccineVoucherRequest._id) {
          return newVaccineVoucherRequest;
        }

        return prevRequest;
      }),
    );

    const [, error] = await handleVaccineVoucherRequestUpdate(
      newVaccineVoucherRequest,
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

  if (vaccineVoucherRequests.length === 0) {
    return (
      <Box
        sx={{
          width: "min(90vw, 700px)",
          boxShadow: 3,
          borderRadius: 2,
          padding: 4,
        }}
      >
        <Typography variant="h5" textAlign="center" gutterBottom>
          You have not applied for any vaccine vouchers.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "min(90vw, 700px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography variant="h6">Screening Requests</Typography>
        <List>
          {vaccineVoucherRequests.map((request, index) => (
            <Box key={request._id}>
              <VaccineVoucherHistoryListItem
                vaccineVoucherRequest={request}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
              {index < vaccineVoucherRequests.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Box>
    </Box>
  );
}
