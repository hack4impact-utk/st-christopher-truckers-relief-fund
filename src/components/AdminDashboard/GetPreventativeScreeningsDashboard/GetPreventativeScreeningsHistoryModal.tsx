"use client";

import InfoIcon from "@mui/icons-material/Info";
import { Box, Button, Typography } from "@mui/material";
import { ReactNode, useState } from "react";

import GetPreventativeScreeningsHistory from "@/components/ClientDashboard/GetPreventativeScreenings/GetPreventativeScreeningsHistory";
import SCFModal from "@/components/SCFModal";
import { ScreeningRequest } from "@/types";

type GetPreventativeScreeningsHistoryModalProps = {
  initialScreeningRequests: ScreeningRequest[];
};

export default function GetPreventativeScreeningsHistoryModal({
  initialScreeningRequests,
}: Readonly<GetPreventativeScreeningsHistoryModalProps>): ReactNode {
  const [open, setOpen] = useState(false);
  const [screeningRequests, setScreeningRequests] = useState(
    initialScreeningRequests,
  );

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
            Get Preventative Screening Request History
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
          <GetPreventativeScreeningsHistory
            screeningRequests={screeningRequests}
            setScreeningRequests={setScreeningRequests}
          />
        </Box>
      </SCFModal>
    </Box>
  );
}
