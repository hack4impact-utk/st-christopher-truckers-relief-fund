"use client";

import InfoIcon from "@mui/icons-material/Info";
import { Box, Button, Fade, Modal, Typography } from "@mui/material";
import { ReactNode, useState } from "react";

import RigsWithoutCigsHistory from "@/components/ClientDashboard/RigsWithoutCigs/RigsWithoutCigsHistory";
import { ClientUser, FagerstromTest, ProgramEnrollment, User } from "@/types";

type FagerstromTestHistoryModalProps = {
  initialFagerstromTests: FagerstromTest[];
  user: User;
  programEnrollment: ProgramEnrollment;
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

export default function FagerstromTestHistoryModal({
  initialFagerstromTests,
  user,
  programEnrollment,
}: FagerstromTestHistoryModalProps): ReactNode {
  const [open, setOpen] = useState(false);
  const [fagerstromTests, setFagerstromTests] = useState(
    initialFagerstromTests,
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
            <Typography variant="h4">Fagerstrom Test History</Typography>
            <RigsWithoutCigsHistory
              user={user as ClientUser}
              fagerstromTests={fagerstromTests}
              setFagerstromTests={setFagerstromTests}
              programEnrollment={programEnrollment}
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
