"use client";
import InfoIcon from "@mui/icons-material/Info";
import { Box, Button, Typography } from "@mui/material";
import { ReactNode, useState } from "react";

import VaccineVoucherHistory from "@/components/ClientDashboard/VaccineVoucher/VaccineVoucherHistory";
import SCFModal from "@/components/SCFModal";
import { VaccineVoucherRequest } from "@/types";

type VaccineVoucherHistoryModalProps = {
  initialVaccineVoucherRequests: VaccineVoucherRequest[];
};

export default function HealthyHabitsHistoryModal({
  initialVaccineVoucherRequests,
}: Readonly<VaccineVoucherHistoryModalProps>): ReactNode {
  const [open, setOpen] = useState(false);
  const [vaccineVoucherRequests, setVaccineVoucherRequests] = useState(
    initialVaccineVoucherRequests,
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
          <Typography variant="h4">Vaccine Voucher Request History</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <VaccineVoucherHistory
            vaccineVoucherRequests={vaccineVoucherRequests}
            setVaccineVoucherRequests={setVaccineVoucherRequests}
          />
        </Box>
      </SCFModal>
    </Box>
  );
}
