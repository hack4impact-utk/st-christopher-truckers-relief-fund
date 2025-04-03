"use client";

import InfoIcon from "@mui/icons-material/Info";
import { Box, Button } from "@mui/material";
import { ReactNode, useState } from "react";

import SCFModal from "@/components/SCFModal";
import { EnrollmentForm } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

import GeneralInformationResponses from "./GeneralInformationResponses";
import ProgramSelectionResponses from "./ProgramSelectionResponses";
import ProgramSpecificResponses from "./ProgramSpecificResponses";
import QualifyingQuestionResponses from "./QualifyingQuestionResponses";

type PendingApplicationInfoModalProps = {
  enrollmentForm: EnrollmentForm;
};

export default function PendingApplicationInfoModal({
  enrollmentForm,
}: Readonly<PendingApplicationInfoModalProps>): ReactNode {
  const [open, setOpen] = useState(false);

  const trigger = (
    <Button variant="contained" onClick={() => setOpen(true)}>
      <InfoIcon />
    </Button>
  );

  const title = `Enrollment Form Submitted on ${dayjsUtil
    .utc(enrollmentForm.dateSubmitted)
    .local()
    .format("MM/DD/YYYY")}`;

  return (
    <SCFModal
      trigger={trigger}
      title={title}
      width="min(90vw, 700px)"
      open={open}
      setOpen={setOpen}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <GeneralInformationResponses
          generalInformationSection={enrollmentForm.generalInformationSection}
        />

        <QualifyingQuestionResponses
          qualifyingQuestionsSection={enrollmentForm.qualifyingQuestionsSection}
        />

        <ProgramSelectionResponses
          programSelectionSection={enrollmentForm.programSelectionSection}
        />

        <ProgramSpecificResponses
          programSpecificQuestionsSection={
            enrollmentForm.programSpecificQuestionsSection
          }
        />
      </Box>
    </SCFModal>
  );
}
