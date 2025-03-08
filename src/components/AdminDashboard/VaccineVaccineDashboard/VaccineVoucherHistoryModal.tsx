"use client";

import InfoIcon from "@mui/icons-material/Info";
import { Box, Button, Fade, Modal, Typography } from "@mui/material";
import { ReactNode, useState } from "react";

import VaccineVoucherHistory from "@/components/ClientDashboard/VaccineVoucher/VaccineVoucherHistory";
import { VaccineVoucherRequest } from "@/types";

type VaccineVoucherHistoryModalProps = {
  initialVaccineVoucherRequests: VaccineVoucherRequest[];
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(90vw, 900px)",
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
  initialVaccineVoucherRequests,
}: VaccineVoucherHistoryModalProps): ReactNode {
  const [open, setOpen] = useState(false);
  const [vaccineVoucherRequests, setVaccineVoucherRequests] = useState(
    initialVaccineVoucherRequests,
  );

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
              Vaccine Voucher Request History
            </Typography>
            <VaccineVoucherHistory
              vaccineVoucherRequests={vaccineVoucherRequests}
              setVaccineVoucherRequests={setVaccineVoucherRequests}
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
