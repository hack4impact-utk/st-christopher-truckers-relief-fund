"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { ReactNode } from "react";

import { FagerstromTest } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

import FagerstromTestModal from "./FagerstromTestModal";

type FagerstromTestListItemProps = {
  fagerstromTest: FagerstromTest;
  handleDelete: (fagerstromTest: FagerstromTest) => void;
};

export default function FagerstromTestListItem({
  fagerstromTest,
  handleDelete,
}: FagerstromTestListItemProps): ReactNode {
  return (
    <ListItem
      secondaryAction={
        <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton edge="end" aria-label="info">
            <FagerstromTestModal fagerstromTest={fagerstromTest} />
          </IconButton>
          <IconButton edge="end" aria-label="info">
            <DeleteIcon onClick={() => handleDelete(fagerstromTest)} />
          </IconButton>
        </Box>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <DescriptionIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`Submitted on ${dayjsUtil
          .utc(fagerstromTest.submittedDate)
          .format("MM/DD/YYYY")}`}
      />
    </ListItem>
  );
}
