"use client";

import InfoIcon from "@mui/icons-material/Info";
import { Box, Button, Typography } from "@mui/material";
import { ReactNode, useState } from "react";

import HealthyHabitsHistory from "@/components/ClientDashboard/HealthyHabits/HealthyHabitsHistory";
import SCFModal from "@/components/SCFModal";
import { ClientUser, HealthyHabitsTrackingForm, User } from "@/types";

type HealthyHabitsHistoryModalProps = {
  initialForms: HealthyHabitsTrackingForm[];
  user: User;
};

export default function HealthyHabitsHistoryModal({
  initialForms,
  user,
}: Readonly<HealthyHabitsHistoryModalProps>): ReactNode {
  const [open, setOpen] = useState(false);
  const [trackingForms, setTrackingForms] = useState(initialForms);

  const trigger = (
    <Button variant="contained" onClick={() => setOpen(true)}>
      <InfoIcon />
    </Button>
  );

  return (
    <Box width="100%">
      <SCFModal
        trigger={trigger}
        width="min(90vw, 900px)"
        open={open}
        setOpen={setOpen}
      >
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography variant="h4">
            Healthy Habits Tracking Form History
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <HealthyHabitsHistory
            trackingForms={trackingForms}
            setTrackingForms={setTrackingForms}
            user={user as ClientUser}
          />
        </Box>
      </SCFModal>
    </Box>
  );
}
