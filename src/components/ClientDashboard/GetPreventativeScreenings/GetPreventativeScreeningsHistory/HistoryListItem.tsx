import DescriptionIcon from "@mui/icons-material/Description";
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { ReactNode } from "react";

import { ScreeningRequest } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

import { getPreventativeScreeningRequestStatusInformation } from "./helpers";

type HistoryListItemProps = {
  screeningRequest: ScreeningRequest;
  handleDelete: (screeningRequest: ScreeningRequest) => Promise<void>;
  handleUpdate: (
    newScreeningRequest: ScreeningRequest,
    confirmationMessage: string,
  ) => Promise<void>;
};

export default function HistoryListItem({
  screeningRequest,
  handleDelete,
  handleUpdate,
}: Readonly<HistoryListItemProps>): ReactNode {
  const { message, buttons } = getPreventativeScreeningRequestStatusInformation(
    screeningRequest,
    handleUpdate,
    handleDelete,
  );

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
        <Box
          sx={{ display: "flex", gap: 2, justifyContent: "flex-end", pt: 2 }}
        >
          {buttons}
        </Box>
      </Box>
    </ListItem>
  );
}
