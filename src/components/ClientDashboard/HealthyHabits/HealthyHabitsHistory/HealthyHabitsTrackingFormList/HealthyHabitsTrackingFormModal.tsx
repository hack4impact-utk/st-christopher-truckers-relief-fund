"use client";

import InfoIcon from "@mui/icons-material/Info";
import { Box, Button, Fade, Modal, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

import FormResponse from "@/components/AdminDashboard/PendingApplicationDashboard/PendingApplicationInfoModal/FormResponse";
import { HealthyHabitsTrackingForm } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

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

type HealthyHabitsTrackingFormModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  form: HealthyHabitsTrackingForm;
};

export default function HealthyHabitsTrackingFormModal({
  form,
  open,
  setOpen,
}: HealthyHabitsTrackingFormModalProps) {
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
              {`Week of ${dayjsUtil.utc(form.weekOfSubmission).format("MM/DD/YYYY")}`}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <FormResponse
                label="Submitted Date"
                value={dayjsUtil
                  .utc(form.submittedDate)
                  .local()
                  .format("MM/DD/YYYY")}
              />
              <FormResponse
                label="Health Conditions"
                value={form.healthConditions}
              />
              <Typography variant="h6">Devices</Typography>
              <FormResponse
                label="Scale"
                value={form.devices.hasScale ? "Yes" : "No"}
                isListItem={true}
              />
              <FormResponse
                label="Blood Pressure Cuff"
                value={form.devices.hasBloodPressureCuff ? "Yes" : "No"}
                isListItem={true}
              />
              <FormResponse
                label="Glucose Monitor"
                value={form.devices.hasGlucoseMonitor ? "Yes" : "No"}
                isListItem={true}
              />
              <FormResponse
                label="A1c Home Test"
                value={form.devices.hasA1cHomeTest ? "Yes" : "No"}
                isListItem={true}
              />
              <FormResponse
                label="Fitness Tracker"
                value={form.devices.hasFitnessTracker ? "Yes" : "No"}
                isListItem={true}
              />
              <FormResponse
                label="Body Tape Measure"
                value={form.devices.hasBodyTapeMeasure ? "Yes" : "No"}
                isListItem={true}
              />
              <FormResponse
                label="Resistance Bands"
                value={form.devices.hasResistanceBands ? "Yes" : "No"}
                isListItem={true}
              />
              <FormResponse
                label="Other Exercise Equipment"
                value={form.devices.hasOtherExerciseEquipment ? "Yes" : "No"}
                isListItem={true}
              />
              <FormResponse
                label="None of the Above"
                value={form.devices.noneOfTheAbove ? "Yes" : "No"}
                isListItem={true}
              />

              <Typography variant="h6">Measurements</Typography>
              <FormResponse
                label="Weight"
                value={`${form.weight} lbs`}
                isListItem={true}
              />
              <FormResponse
                label="Blood Pressure"
                value={`${form.systolicBloodPressure}/${form.diastolicBloodPressure}`}
                isListItem={true}
              />
              <FormResponse
                label="Blood Glucose"
                value={form.bloodGlucose}
                isListItem={true}
              />

              <Typography variant="h6">Daily Activity</Typography>
              <FormResponse
                label="Movement Minutes"
                value={form.movementMinutes}
                isListItem={true}
              />

              <Typography variant="h6">Wellness Rankings</Typography>
              <FormResponse
                label="Sleep"
                value={form.sleepRanking}
                isListItem={true}
              />
              <FormResponse
                label="Energy"
                value={form.energyRanking}
                isListItem={true}
              />
              <FormResponse
                label="Emotional Health"
                value={form.emotionalHealthRanking}
                isListItem={true}
              />

              <Typography variant="h6">Goals</Typography>
              <FormResponse
                label="Qualitative Goals"
                value={form.qualitativeGoals}
                isListItem={true}
              />
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
