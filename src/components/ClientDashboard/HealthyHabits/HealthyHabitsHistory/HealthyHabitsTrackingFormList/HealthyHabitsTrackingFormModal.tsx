"use client";
import InfoIcon from "@mui/icons-material/Info";
import { Box, IconButton } from "@mui/material";
import { ReactNode, useState } from "react";

import SCFModal from "@/components/SCFModal";
import FormResponse from "@/components/SCFModal/FormResponse";
import FormSection from "@/components/SCFModal/FormSection";
import { HealthyHabitsTrackingForm } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

type HealthyHabitsTrackingFormModalProps = {
  form: HealthyHabitsTrackingForm;
};

export default function HealthyHabitsTrackingFormModal({
  form,
}: Readonly<HealthyHabitsTrackingFormModalProps>): ReactNode {
  const [open, setOpen] = useState(false);
  const devices = [
    { label: "Scale", value: form.devices.hasScale ? "Yes" : "No" },
    {
      label: "Blood Pressure Cuff",
      value: form.devices.hasBloodPressureCuff ? "Yes" : "No",
    },
    {
      label: "Glucose Monitor",
      value: form.devices.hasGlucoseMonitor ? "Yes" : "No",
    },
    {
      label: "A1c Home Test",
      value: form.devices.hasA1cHomeTest ? "Yes" : "No",
    },
    {
      label: "Fitness Tracker",
      value: form.devices.hasFitnessTracker ? "Yes" : "No",
    },
    {
      label: "Body Tape Measure",
      value: form.devices.hasBodyTapeMeasure ? "Yes" : "No",
    },
    {
      label: "Resistance Bands",
      value: form.devices.hasResistanceBands ? "Yes" : "No",
    },
    {
      label: "Other Exercise Equipment",
      value: form.devices.hasOtherExerciseEquipment ? "Yes" : "No",
    },
    {
      label: "None of the Above",
      value: form.devices.noneOfTheAbove ? "Yes" : "No",
    },
  ];

  const measurements = [
    { label: "Weight", value: `${form.weight} lbs` },
    {
      label: "Blood Pressure",
      value: `${form.systolicBloodPressure}/${form.diastolicBloodPressure}`,
    },
    {
      label: "Blood Glucose",
      value: form.bloodGlucose ? `${form.bloodGlucose} mg/dL` : "N/A",
    },
    { label: "A1c", value: form.a1c ? `${form.a1c}%` : "N/A" },
    {
      label: "Cholesterol",
      value: form.cholesterol ? `${form.cholesterol} mg/dL` : "N/A",
    },
  ];

  const wellnessRankings = [
    { label: "Sleep", value: `${form.sleepRanking}/5` },
    { label: "Energy", value: `${form.energyRanking}/5` },
    { label: "Emotional Health", value: `${form.emotionalHealthRanking}/5` },
  ];

  const trigger = (
    <IconButton edge="end" aria-label="info" onClick={() => setOpen(true)}>
      <InfoIcon />
    </IconButton>
  );

  return (
    <SCFModal
      trigger={trigger}
      open={open}
      setOpen={setOpen}
      title={`Form submitted on ${dayjsUtil
        .utc(form.submittedDate)
        .local()
        .format("MM/DD/YYYY")}`}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormSection title="Basic Information">
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
          <FormResponse
            label="Movement Minutes"
            value={`${form.movementMinutes} minutes`}
          />
          <FormResponse
            label="Qualitative Goals"
            value={form.qualitativeGoals}
          />
        </FormSection>

        <FormSection title="Measurements">
          {measurements.map((measurement) => (
            <FormResponse
              key={measurement.label}
              label={measurement.label}
              value={measurement.value}
            />
          ))}
        </FormSection>

        <FormSection title="Devices">
          {devices.map((device) => (
            <FormResponse
              key={device.label}
              label={device.label}
              value={device.value}
            />
          ))}
        </FormSection>

        <FormSection title="Wellness Rankings">
          {wellnessRankings.map((ranking) => (
            <FormResponse
              key={ranking.label}
              label={ranking.label}
              value={ranking.value}
            />
          ))}
        </FormSection>
      </Box>
    </SCFModal>
  );
}
