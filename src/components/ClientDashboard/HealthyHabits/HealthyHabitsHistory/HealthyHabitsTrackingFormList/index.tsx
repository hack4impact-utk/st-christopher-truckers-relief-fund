"use client";

import { Box, List, Snackbar, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

import HealthyHabitsTrackingFormListItem from "@/components/ClientDashboard/HealthyHabits/HealthyHabitsHistory/HealthyHabitsTrackingFormList/HealthyHabitsTrackingFormListItem";
import { handleHealthyHabitsTrackingFormDeletion } from "@/server/api/healthy-habits-tracking-forms/public-mutations";
import { ClientUser, HealthyHabitsTrackingForm } from "@/types";

type HealthyHabitsTrackingFormListProps = {
  trackingForms: HealthyHabitsTrackingForm[];
  setTrackingForms: Dispatch<SetStateAction<HealthyHabitsTrackingForm[]>>;
  user: ClientUser;
};

export default function HealthyHabitsTrackingFormList({
  trackingForms,
  setTrackingForms,
  user,
}: HealthyHabitsTrackingFormListProps) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleDelete = async (form: HealthyHabitsTrackingForm) => {
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
      setSnackbarMessage("An unexpected error occurred.");
    } else {
      setSnackbarMessage("Form deleted successfully.");
    }

    setSnackbarOpen(true);
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
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
    </>
  );
}
