import { Box } from "@mui/material";
import { ReactNode } from "react";

import FormResponse from "@/components/SCFModal/FormResponse";
import FormSection from "@/components/SCFModal/FormSection";
import FormSubsection from "@/components/SCFModal/FormSubsection";
import { ProgramSpecificQuestionsSection } from "@/types";
import getBmiClassification from "@/utils/getBmiClassification";

type HealthyHabitsAndDiabetesPreventionResponsesProps = {
  programSpecificQuestionsSection: ProgramSpecificQuestionsSection;
};

export default function HealthyHabitsAndDiabetesPreventionResponses({
  programSpecificQuestionsSection,
}: Readonly<HealthyHabitsAndDiabetesPreventionResponsesProps>): ReactNode {
  const healthInformationResponses = [
    {
      label: "Weight",
      value:
        programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention.weight.toString(),
    },
    {
      label: "Height",
      value: `${programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention.heightFeet} ft ${programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention.heightInches} in`,
    },
    {
      label: "BMI",
      value: `${programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention.bmi.toFixed(1)} (${getBmiClassification(programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention.bmi)})`,
    },
    {
      label: "Had Glucose/A1C Test in Past Year",
      value: programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
        .hasHadGlucoseOrA1CTestInPastYear
        ? "Yes"
        : "No",
    },
    {
      label: "Glucose/A1C Test Result",
      value:
        programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
          .glucoseOrA1CTestResult,
    },
    {
      label: "Systolic Blood Pressure",
      value:
        programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
          .systolicBloodPressure,
    },
    {
      label: "Diastolic Blood Pressure",
      value:
        programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
          .diastolicBloodPressure,
    },
  ];

  const rankings = [
    {
      label: "Movement and Activity Ranking",
      value:
        programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
          .movementAndActivityRanking,
    },
    {
      label: "Energy Ranking",
      value:
        programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
          .energyRanking,
    },
    {
      label: "Sleep Ranking",
      value:
        programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
          .sleepRanking,
    },
    {
      label: "Emotional Health Ranking",
      value:
        programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
          .emotionalHealthRanking,
    },
    {
      label: "Water Bottles Per Day",
      value:
        programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
          .waterBottlesPerDay,
    },
    {
      label: "Fruit and Vegetable Servings Per Day",
      value:
        programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
          .fruitAndVegetableServingsPerDay,
    },
  ];

  const devicesResponses = [
    {
      label: "A1c Home Test",
      value: programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
        .devices.hasA1cHomeTest
        ? "Yes"
        : "No",
    },
    {
      label: "Blood Pressure Cuff",
      value: programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
        .devices.hasBloodPressureCuff
        ? "Yes"
        : "No",
    },
    {
      label: "Body Tape Measure",
      value: programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
        .devices.hasBodyTapeMeasure
        ? "Yes"
        : "No",
    },
    {
      label: "Fitness Tracker",
      value: programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
        .devices.hasFitnessTracker
        ? "Yes"
        : "No",
    },
    {
      label: "Glucose Monitor",
      value: programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
        .devices.hasGlucoseMonitor
        ? "Yes"
        : "No",
    },
    {
      label: "Other Exercise Equipment",
      value: programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
        .devices.hasOtherExerciseEquipment
        ? "Yes"
        : "No",
    },
    {
      label: "Resistance Bands",
      value: programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
        .devices.hasResistanceBands
        ? "Yes"
        : "No",
    },
    {
      label: "Scale",
      value: programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
        .devices.hasScale
        ? "Yes"
        : "No",
    },
    {
      label: "None of the Above",
      value: programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
        .devices.noneOfTheAbove
        ? "Yes"
        : "No",
    },
  ];

  const miscellaneousResponses = [
    {
      label: "Other Illness or Injury",
      value:
        programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
          .otherIllnessOrInjury,
    },
    {
      label: "Biggest Healthy Living Challenge",
      value:
        programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
          .biggestHealthyLivingChallenge,
    },
    {
      label: "Short-Term Health Goals",
      value:
        programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
          .shortTermHealthGoals,
    },
    {
      label: "Long-Term Health Goals",
      value:
        programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
          .longTermHealthGoals,
    },
    {
      label: "Healthy Habits Hopeful Learnings",
      value:
        programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
          .healthyHabitsHopefulLearnings,
    },
    {
      label: "Diabetes Prevention Hopeful Learnings",
      value:
        programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
          .diabetesPreventionHopefulLearnings,
    },
  ];

  return (
    <Box mb={2}>
      <FormSection title="Healthy Habits and Diabetes Prevention Responses">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormSubsection title="Health Information">
            {healthInformationResponses.map((response) => (
              <FormResponse
                key={response.label}
                label={response.label}
                value={response.value}
                isListItem={true}
              />
            ))}
          </FormSubsection>

          <FormSubsection title="Devices">
            {devicesResponses.map((response) => (
              <FormResponse
                key={response.label}
                label={response.label}
                value={response.value}
                isListItem={true}
              />
            ))}
          </FormSubsection>

          <FormSubsection title="Rankings">
            {rankings.map((response) => (
              <FormResponse
                key={response.label}
                label={response.label}
                value={response.value}
                isListItem={true}
              />
            ))}
          </FormSubsection>

          <FormSubsection title="Miscellaneous">
            {miscellaneousResponses.map((response) => (
              <FormResponse
                key={response.label}
                label={response.label}
                value={response.value}
                isListItem={true}
              />
            ))}
          </FormSubsection>
        </Box>
      </FormSection>
    </Box>
  );
}
