import { Box, Typography } from "@mui/material";

import { ProgramSpecificQuestionsSection } from "@/types";
import getBmiClassification from "@/utils/getBmiClassification";

import FormResponse from "../FormResponse";

type HealthyHabitsAndDiabetesPreventionResponsesProps = {
  programSpecificQuestionsSection: ProgramSpecificQuestionsSection;
};

export default function HealthyHabitsAndDiabetesPreventionResponses({
  programSpecificQuestionsSection,
}: HealthyHabitsAndDiabetesPreventionResponsesProps) {
  return (
    <Box mb={2}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ textDecoration: "underline" }}
      >
        Healthy Habits and Diabetes Prevention Responses
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormResponse
          label="Weight"
          value={programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention.weight.toString()}
        />
        <FormResponse
          label="Height"
          value={`${programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention.heightFeet} ft ${programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention.heightInches} in`}
        />
        <FormResponse
          label="BMI"
          value={`${programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention.bmi.toFixed(
            1,
          )} (${getBmiClassification(
            programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
              .bmi,
          )})`}
        />
        <FormResponse
          label="Had Glucose/A1C Test in Past Year"
          value={
            programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
              .hasHadGlucoseOrA1CTestInPastYear
              ? "Yes"
              : "No"
          }
        />
        <FormResponse
          label="Glucose/A1C Test Result"
          value={
            programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
              .glucoseOrA1CTestResult
          }
          isListItem={true}
        />
        <FormResponse
          label="Blood Pressure"
          value={
            programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
              .bloodPressure
          }
        />
        <FormResponse
          label="Movement and Activity Ranking"
          value={
            programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
              .movementAndActivityRanking
          }
        />
        <FormResponse
          label="Energy Ranking"
          value={
            programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
              .energyRanking
          }
        />
        <FormResponse
          label="Sleep Ranking"
          value={
            programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
              .sleepRanking
          }
        />
        <FormResponse
          label="Emotional Health Ranking"
          value={
            programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
              .emotionalHealthRanking
          }
        />
        <FormResponse
          label="Water Bottles Per Day"
          value={
            programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
              .waterBottlesPerDay
          }
        />
        <FormResponse
          label="Fruit and Vegetable Servings Per Day"
          value={
            programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
              .fruitAndVegetableServingsPerDay
          }
        />
        <FormResponse
          label="Other Illness or Injury"
          value={
            programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
              .otherIllnessOrInjury
          }
        />
        <FormResponse
          label="Biggest Healthy Living Challenge"
          value={
            programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
              .biggestHealthyLivingChallenge
          }
        />
        <FormResponse
          label="Short-Term Health Goals"
          value={
            programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
              .shortTermHealthGoals
          }
        />
        <FormResponse
          label="Long-Term Health Goals"
          value={
            programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
              .longTermHealthGoals
          }
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography sx={{ textDecoration: "underline" }}>Devices:</Typography>
          <FormResponse
            label="A1c Home Test"
            value={
              programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
                .devices.hasA1cHomeTest
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />
          <FormResponse
            label="Blood Pressure Cuff"
            value={
              programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
                .devices.hasBloodPressureCuff
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />
          <FormResponse
            label="Body Tape Measure"
            value={
              programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
                .devices.hasBodyTapeMeasure
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />
          <FormResponse
            label="Fitness Tracker"
            value={
              programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
                .devices.hasFitnessTracker
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />
          <FormResponse
            label="Glucose Monitor"
            value={
              programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
                .devices.hasGlucoseMonitor
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />
          <FormResponse
            label="Other Exercise Equipment"
            value={
              programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
                .devices.hasOtherExerciseEquipment
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />
          <FormResponse
            label="Resistance Bands"
            value={
              programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
                .devices.hasResistanceBands
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />
          <FormResponse
            label="Scale"
            value={
              programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
                .devices.hasScale
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />
          <FormResponse
            label="None of the Above"
            value={
              programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
                .devices.noneOfTheAbove
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />
        </Box>
        <FormResponse
          label="Healthy Habits Hopeful Learnings"
          value={
            programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
              .healthyHabitsHopefulLearnings
          }
        />
        <FormResponse
          label="Diabetes Prevention Hopeful Learnings"
          value={
            programSpecificQuestionsSection.healthyHabitsAndDiabetesPrevention
              .diabetesPreventionHopefulLearnings
          }
        />
      </Box>
    </Box>
  );
}
