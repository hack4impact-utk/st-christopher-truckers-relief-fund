import { Box, Divider, List, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { Dispatch, ReactNode, SetStateAction } from "react";

import {
  handleScreeningRequestDeletion,
  handleScreeningRequestUpdate,
} from "@/server/api/screening-requests.ts/public-mutations";
import { ScreeningRequest } from "@/types";
import { ClientUser } from "@/types/User";

import HistoryListItem from "./HistoryListItem";

type GetPreventativeScreeningsHistoryProps = {
  user: ClientUser;
  screeningRequests: ScreeningRequest[];
  setScreeningRequests: Dispatch<SetStateAction<ScreeningRequest[]>>;
};

export default function GetPreventativeScreeningsHistory({
  user,
  screeningRequests,
  setScreeningRequests,
}: GetPreventativeScreeningsHistoryProps): ReactNode {
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async (
    screeningRequest: ScreeningRequest,
  ): Promise<void> => {
    const confirm = window.confirm(
      "Are you sure you want to delete this screening request?",
    );

    if (!confirm) {
      return;
    }

    setScreeningRequests((prevScreeningRequests) =>
      prevScreeningRequests.filter(
        (prevScreeningRequest) =>
          prevScreeningRequest._id !== screeningRequest._id,
      ),
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

    setScreeningRequests((prevScreeningRequests) =>
      prevScreeningRequests.map((prevScreeningRequest) =>
        prevScreeningRequest._id === newScreeningRequest._id
          ? newScreeningRequest
          : prevScreeningRequest,
      ),
    );

    const [, error] = await handleScreeningRequestUpdate(newScreeningRequest);

    if (error !== null) {
      enqueueSnackbar("An unexpected error occurred.");
    } else {
      enqueueSnackbar("Screening request updated successfully.");
    }
  };

  if (screeningRequests.length === 0) {
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
          You have not applied for any screenings.
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
          {screeningRequests.map((request, index) => (
            <Box key={request._id}>
              <HistoryListItem
                screeningRequest={request}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
              {index < screeningRequests.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Box>
    </Box>
  );
}
