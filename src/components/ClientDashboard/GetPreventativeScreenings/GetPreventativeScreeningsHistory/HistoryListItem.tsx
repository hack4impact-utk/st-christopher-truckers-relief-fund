import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { ReactNode } from "react";

import { ScreeningRequest } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

type HistoryListItemProps = {
  screeningRequest: ScreeningRequest;
  handleDelete: (screeningRequest: ScreeningRequest) => Promise<void>;
  handleUpdate: (
    newScreeningRequest: ScreeningRequest,
    confirmationMessage: string,
  ) => Promise<void>;
};

type StatusInformation = {
  message: string;
  buttons: ReactNode;
};

export default function HistoryListItem({
  screeningRequest,
  handleDelete,
  handleUpdate,
}: HistoryListItemProps): ReactNode {
  function DeleteButton(): ReactNode {
    return (
      <Tooltip title="Delete">
        <IconButton edge="end" onClick={() => handleDelete(screeningRequest)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    );
  }

  const getStatusInformation = (): StatusInformation => {
    switch (screeningRequest.status) {
      case "requested":
        return {
          message: "Please wait while SCF reviews your request.",
          buttons: (
            <>
              <DeleteButton />
            </>
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
              <Tooltip title="Report positive">
                <IconButton
                  edge="end"
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
                  <AddCircleOutlineIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Report negative">
                <IconButton
                  edge="end"
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
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Tooltip>
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
              <Tooltip title="Report positive">
                <IconButton
                  edge="end"
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
                  <AddCircleOutlineIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Report negative">
                <IconButton
                  edge="end"
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
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Tooltip>
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
            <>
              <DeleteButton />
            </>
          ),
        };
    }
  };

  const { message, buttons } = getStatusInformation();

  return (
    <ListItem>
      <ListItemAvatar>
        <Tooltip
          title={`Submitted on ${dayjsUtil.utc(screeningRequest.submittedDate).format("MM/DD/YYYY")}`}
        >
          <Avatar>
            <DescriptionIcon />
          </Avatar>
        </Tooltip>
      </ListItemAvatar>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <ListItemText primary={`${screeningRequest.name}: ${message}`} />
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          {buttons}
        </Box>
      </Box>
    </ListItem>
  );
}
