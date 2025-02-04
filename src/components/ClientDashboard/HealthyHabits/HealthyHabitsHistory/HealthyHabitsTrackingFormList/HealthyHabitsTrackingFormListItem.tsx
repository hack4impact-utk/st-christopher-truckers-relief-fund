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
import { ReactNode, useState } from "react";

import { HealthyHabitsTrackingForm } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

import HealthyHabitsTrackingFormModal from "./HealthyHabitsTrackingFormModal";

type HealthyHabitsTrackingFormListItemProps = {
  form: HealthyHabitsTrackingForm;
  handleDelete: (form: HealthyHabitsTrackingForm) => void;
};

export default function HealthyHabitsTrackingFormListItem({
  form,
  handleDelete,
}: HealthyHabitsTrackingFormListItemProps): ReactNode {
  const [open, setOpen] = useState(false);

  return (
    <ListItem
      secondaryAction={
        <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton edge="end" aria-label="info">
            <HealthyHabitsTrackingFormModal
              form={form}
              open={open}
              setOpen={setOpen}
            />
          </IconButton>
          <IconButton edge="end" onClick={() => handleDelete(form)}>
            <DeleteIcon />
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
        primary={`Week of ${dayjsUtil.utc(form.weekOfSubmission).format("MM/DD/YYYY")}`}
      />
    </ListItem>
  );
}
