"use client";
import InfoIcon from "@mui/icons-material/Info";
import { Box, Button, Typography } from "@mui/material";
import { ReactNode, useState } from "react";

import RigsWithoutCigsHistory from "@/components/ClientDashboard/RigsWithoutCigs/RigsWithoutCigsHistory";
import SCFModal from "@/components/SCFModal";
import { ClientUser, FagerstromTest, ProgramEnrollment, User } from "@/types";

type FagerstromTestHistoryModalProps = {
  initialFagerstromTests: FagerstromTest[];
  user: User;
  programEnrollment: ProgramEnrollment;
};

export default function FagerstromTestHistoryModal({
  initialFagerstromTests,
  user,
  programEnrollment,
}: Readonly<FagerstromTestHistoryModalProps>): ReactNode {
  const [open, setOpen] = useState(false);
  const [fagerstromTests, setFagerstromTests] = useState(
    initialFagerstromTests,
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
          <Typography variant="h4">Fagerstrom Test History</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <RigsWithoutCigsHistory
            user={user as ClientUser}
            fagerstromTests={fagerstromTests}
            setFagerstromTests={setFagerstromTests}
            programEnrollment={programEnrollment}
          />
        </Box>
      </SCFModal>
    </Box>
  );
}
