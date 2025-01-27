"use client";

import InfoIcon from "@mui/icons-material/Info";
import { Box, Button, Fade, Modal, Typography } from "@mui/material";
import { useState } from "react";

import HealthyHabitsHistory from "@/components/ClientDashboard/HealthyHabits/HealthyHabitsHistory";
import { ClientUser, HealthyHabitsTrackingForm, User } from "@/types";

type HealthyHabitsHistoryModalProps = {
  trackingForms: HealthyHabitsTrackingForm[];
  user: User;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 2,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
};

export default function HealthyHabitsHistoryModal({
  trackingForms,
  user,
}: HealthyHabitsHistoryModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Box width="100%">
      {/* Info Button */}
      <Button variant="contained" onClick={() => setOpen(true)}>
        <InfoIcon />
      </Button>

      {/* Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant="h4">
              Healthy Habits Tracking Form History
            </Typography>
            <HealthyHabitsHistory
              initialForms={trackingForms}
              user={user as ClientUser}
            />
            <Button
              variant="outlined"
              onClick={() => setOpen(false)}
              sx={{ width: "50%" }}
            >
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
