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

import { VaccineVoucherRequest } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

import { getVaccineVoucherStatusInformation } from "./helpers";

type VaccineVoucherHistoryListItemProps = {
  vaccineVoucherRequest: VaccineVoucherRequest;
  handleDelete: (vaccineVoucherRequest: VaccineVoucherRequest) => void;
  handleUpdate: (
    newVaccineVoucherRequest: VaccineVoucherRequest,
    confirmationMessage: string,
  ) => void;
};

export default function VaccineVoucherHistoryListItem({
  vaccineVoucherRequest,
  handleDelete,
  handleUpdate,
}: VaccineVoucherHistoryListItemProps): ReactNode {
  const { message, buttons } = getVaccineVoucherStatusInformation(
    vaccineVoucherRequest,
    handleUpdate,
    handleDelete,
  );

  return (
    <ListItem>
      <ListItemAvatar>
        <Tooltip
          title={`Submitted on ${dayjsUtil.utc(vaccineVoucherRequest.submittedDate).format("MM/DD/YYYY")}`}
        >
          <Avatar>
            <DescriptionIcon />
          </Avatar>
        </Tooltip>
      </ListItemAvatar>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <ListItemText
          primary={`${vaccineVoucherRequest.vaccineName}: ${message}`}
        />
        <Box
          sx={{ display: "flex", gap: 2, justifyContent: "flex-end", pt: 2 }}
        >
          {buttons}
        </Box>
      </Box>
    </ListItem>
  );
}
