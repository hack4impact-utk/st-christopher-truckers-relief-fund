"use client";

import { Box, List, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { Dispatch, ReactNode, SetStateAction } from "react";

import { handleHealthyHabitsTrackingFormDeletion } from "@/server/api/healthy-habits-tracking-forms/public-mutations";
import { ClientUser, HealthyHabitsTrackingForm } from "@/types";

import HealthyHabitsTrackingFormListItem from "./HealthyHabitsTrackingFormListItem";

type HealthyHabitsTrackingFormListProps = {
  trackingForms: HealthyHabitsTrackingForm[];
  setTrackingForms: Dispatch<SetStateAction<HealthyHabitsTrackingForm[]>>;
  user: ClientUser;
};

export default function HealthyHabitsTrackingFormList({
  trackingForms,
  setTrackingForms,
  user,
}: Readonly<HealthyHabitsTrackingFormListProps>): ReactNode {
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async (
    form: HealthyHabitsTrackingForm,
  ): Promise<void> => {
    const confirm = window.confirm(
      "Are you sure you want to delete this tracking form?",
    );

    if (!confirm) {
      return;
    }

    setTrackingForms((prevForms) =>
      prevForms.filter((prevForm) => prevForm._id !== form._id),
    );

    const [, error] = await handleHealthyHabitsTrackingFormDeletion(form, user);

    if (error !== null) {
      enqueueSnackbar("An unexpected error occurred.", { variant: "error" });
    } else {
      enqueueSnackbar("Form deleted successfully.", { variant: "success" });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6">Previous forms</Typography>
      <List>
        {trackingForms.map((form) => (
          <HealthyHabitsTrackingFormListItem
            key={form._id}
            form={form}
            handleDelete={handleDelete}
          />
        ))}
      </List>
    </Box>
  );
}
