"use client";

import InfoIcon from "@mui/icons-material/Info";
import { Box, Button, Fade, Modal, Typography } from "@mui/material";
import { useState } from "react";

import { EnrollmentForm } from "@/types";

import GeneralInformationResponses from "./GeneralInformationResponses";
import ProgramSelectionResponses from "./ProgramSelectionResponses";
import ProgramSpecificResponses from "./ProgramSpecificResponses";
import QualifyingQuestionResponses from "./QualifyingQuestionResponses";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 2,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

type PendingApplicationInfoModalProps = {
  enrollmentForm: EnrollmentForm;
};

export default function PendingApplicationInfoModal({
  enrollmentForm,
}: PendingApplicationInfoModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Box>
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
            <Typography id="transition-modal-title" variant="h4">
              Enrollment Form Information
            </Typography>

            <GeneralInformationResponses
              generalInformationSection={
                enrollmentForm.generalInformationSection
              }
            />

            <QualifyingQuestionResponses
              qualifyingQuestionsSection={
                enrollmentForm.qualifyingQuestionsSection
              }
            />

            <ProgramSelectionResponses
              programSelectionSection={enrollmentForm.programSelectionSection}
            />

            <ProgramSpecificResponses
              programSpecificQuestionsSection={
                enrollmentForm.programSpecificQuestionsSection
              }
            />

            <Button
              variant="outlined"
              onClick={() => setOpen(false)}
              sx={{ mt: 3 }}
            >
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
