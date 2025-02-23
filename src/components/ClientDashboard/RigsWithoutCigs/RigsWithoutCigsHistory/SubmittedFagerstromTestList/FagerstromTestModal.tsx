"use client";

import InfoIcon from "@mui/icons-material/Info";
import { Box, Button, Fade, Modal, Typography } from "@mui/material";
import { ReactNode, useState } from "react";

import FormResponse from "@/components/AdminDashboard/PendingApplicationDashboard/PendingApplicationInfoModal/FormResponse";
import { FagerstromTest } from "@/types/FagerstromTest";
import dayjsUtil from "@/utils/dayjsUtil";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(90vw, 700px)",
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 2,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

type FagerstromTestModalProps = {
  fagerstromTest: FagerstromTest;
};

export default function FagerstromTestModal({
  fagerstromTest,
}: FagerstromTestModalProps): ReactNode {
  const [open, setOpen] = useState(false);

  return (
    <>
      <InfoIcon onClick={() => setOpen(true)} />

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
              {`Fagerstrom Test Submitted on ${dayjsUtil
                .utc(fagerstromTest.submittedDate)
                .format("MM/DD/YYYY")}`}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {fagerstromTest.doesUseCigarettes && (
                <>
                  <Typography variant="h6">Cigarettes</Typography>
                  <FormResponse
                    label="Fagerstrom Test Score"
                    value={fagerstromTest.cigaretteFagerstromScore}
                  />
                  <FormResponse
                    label="First Smoke Time"
                    value={fagerstromTest.firstSmokeTime}
                  />
                  <FormResponse
                    label="Is Difficult to Not Smoke in Forbidden Areas"
                    value={
                      fagerstromTest.isDifficultToNotSmokeInForbiddenAreas
                        ? "Yes"
                        : "No"
                    }
                  />
                  <FormResponse
                    label="Cigarette Hate to Give Up"
                    value={fagerstromTest.cigaretteHateToGiveUp}
                  />
                  <FormResponse
                    label="Cigarettes Per Day"
                    value={fagerstromTest.cigarettesPerDay}
                  />
                  <FormResponse
                    label="Smoke More in Morning"
                    value={fagerstromTest.smokeMoreInMorning ? "Yes" : "No"}
                  />
                  <FormResponse
                    label="Smoke When Ill"
                    value={fagerstromTest.smokeWhenIll ? "Yes" : "No"}
                  />
                </>
              )}

              {fagerstromTest.doesUseSmokelessTobacco && (
                <>
                  <Typography variant="h6">Smokeless Tobacco</Typography>
                  <FormResponse
                    label="Fagerstrom Test Score"
                    value={fagerstromTest.tobaccoFagerstromScore}
                  />
                  <FormResponse
                    label="First Tobacco Time"
                    value={fagerstromTest.firstTobaccoTime}
                  />
                  <FormResponse
                    label="Swallow Tobacco Juice"
                    value={fagerstromTest.swallowTobaccoJuice}
                  />
                  <FormResponse
                    label="Tobacco Hate to Give Up"
                    value={fagerstromTest.tobaccoHateToGiveUp}
                  />
                  <FormResponse
                    label="Tobacco Cans Per Week"
                    value={fagerstromTest.tobaccoCansPerWeek}
                  />
                  <FormResponse
                    label="Tobacco Chew More After Awakening"
                    value={
                      fagerstromTest.tobaccoChewMoreAfterAwakening
                        ? "Yes"
                        : "No"
                    }
                  />
                  <FormResponse
                    label="Tobacco Chew When Ill"
                    value={fagerstromTest.tobaccoChewWhenIll ? "Yes" : "No"}
                  />
                </>
              )}
            </Box>

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
    </>
  );
}
