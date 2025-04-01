"use client";
import InfoIcon from "@mui/icons-material/Info";
import { Box, Typography } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction } from "react";

import FormResponse from "@/components/AdminDashboard/PendingApplicationDashboard/PendingApplicationInfoModal/FormResponse";
import SCFModal from "@/components/SCFModal";
import { HealthyHabitsTrackingForm } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

type HealthyHabitsTrackingFormModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  form: HealthyHabitsTrackingForm;
};

export default function HealthyHabitsTrackingFormModal({
  form,
  open,
  setOpen,
}: Readonly<HealthyHabitsTrackingFormModalProps>): ReactNode {
  const trigger = <InfoIcon onClick={() => setOpen(true)} />;

  return (
    <SCFModal
      trigger={trigger}
      title={`Week of ${dayjsUtil.utc(form.weekOfSubmission).format("MM/DD/YYYY")}`}
      width="min(90vw, 700px)"
      open={open}
      setOpen={setOpen}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormResponse
          label="Submitted Date"
          value={dayjsUtil.utc(form.submittedDate).local().format("MM/DD/YYYY")}
        />
        <FormResponse label="Health Conditions" value={form.healthConditions} />
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
          value={form.bloodGlucose ? `${form.bloodGlucose} mg/dL` : "N/A"}
          isListItem={true}
        />
        <FormResponse
          label="A1c"
          value={form.a1c ? `${form.a1c}%` : "N/A"}
          isListItem={true}
        />
        <FormResponse
          label="Cholesterol"
          value={form.cholesterol ? `${form.cholesterol} mg/dL` : "N/A"}
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
    </SCFModal>
  );
}
