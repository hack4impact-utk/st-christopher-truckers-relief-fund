import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, Tooltip } from "@mui/material";
import { ReactNode } from "react";

import { ScreeningRequest } from "@/types";

type StatusInformation = {
  message: string;
  buttons: ReactNode;
};

type DeleteButtonProps = {
  screeningRequest: ScreeningRequest;
  handleDelete: (screeningRequest: ScreeningRequest) => void;
};
function DeleteButton({
  screeningRequest,
  handleDelete,
}: Readonly<DeleteButtonProps>): ReactNode {
  return (
    <Tooltip title="Delete">
      <IconButton edge="end" onClick={() => handleDelete(screeningRequest)}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}

export function getPreventativeScreeningRequestStatusInformation(
  screeningRequest: ScreeningRequest,
  handleUpdate: (
    newScreeningRequest: ScreeningRequest,
    confirmationMessage: string,
  ) => void,
  handleDelete: (screeningRequest: ScreeningRequest) => void,
): StatusInformation {
  switch (screeningRequest.status) {
    case "requested":
      return {
        message: "Please wait while SCF reviews your request.",
        buttons: (
          <DeleteButton
            screeningRequest={screeningRequest}
            handleDelete={handleDelete}
          />
        ),
      };
    case "rejected":
      return {
        message: "Your request has been rejected.",
        buttons: <></>,
      };
    case "qualified":
      return {
        message: "Your request has been approved. Please report your result.",
        buttons: (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                handleUpdate(
                  {
                    ...screeningRequest,
                    status: "initial positive",
                  },
                  "Are you sure you want to report a positive result?",
                )
              }
            >
              Report positive
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() =>
                handleUpdate(
                  {
                    ...screeningRequest,
                    status: "negative",
                  },
                  "Are you sure you want to report a negative result?",
                )
              }
            >
              Report negative
            </Button>
          </>
        ),
      };
    case "negative":
      return {
        message: 'Your result was "Negative".',
        buttons: <></>,
      };
    case "initial positive":
      return {
        message:
          "Your first result was positive. Please reach out to SCF to receive a second screening to confirm your result. Then, report the second result here.",
        buttons: (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                handleUpdate(
                  {
                    ...screeningRequest,
                    status: "true positive",
                  },
                  "Are you sure you want to report a positive result?",
                )
              }
            >
              Report Positive
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() =>
                handleUpdate(
                  {
                    ...screeningRequest,
                    status: "false positive",
                  },
                  "Are you sure you want to report a negative result?",
                )
              }
            >
              Report negative
            </Button>
          </>
        ),
      };
    case "true positive":
      return {
        message: 'Your result was "True Positive".',
        buttons: <></>,
      };
    case "false positive":
      return {
        message: 'Your result was "False Positive".',
        buttons: <></>,
      };
    default:
      return {
        message: "Unknown",
        buttons: (
          <DeleteButton
            screeningRequest={screeningRequest}
            handleDelete={handleDelete}
          />
        ),
      };
  }
}
