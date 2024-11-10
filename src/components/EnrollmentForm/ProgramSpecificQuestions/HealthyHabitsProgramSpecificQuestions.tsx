/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";

import ControlledTextField from "@/components/controlled/ControlledTextField";

type HealthyHabitsProgramSpecificQuestionsProps = {
  control: Control<any>;
  errors: any;
  hasOptedInToHealthyHabits: boolean;
  hasOptedInToDiabetesPrevention: boolean;
};

export default function HealthyHabitsProgramSpecificQuestions({
  control,
  errors,
  hasOptedInToHealthyHabits,
  hasOptedInToDiabetesPrevention,
}: HealthyHabitsProgramSpecificQuestionsProps) {
  return (
    <>
      <Divider />

      <Typography variant="h6">
        Healthy Habits and Diabetes Prevention
      </Typography>

      <ControlledTextField
        control={control}
        name="healthyHabitsAndDiabetesPrevention.weight"
        label="Weight"
        variant="outlined"
        error={errors.healthyHabitsAndDiabetesPrevention?.weight}
        type="number"
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">lbs</InputAdornment>,
          },
        }}
        convertToNumber={true}
        required
      />

      <ControlledTextField
        control={control}
        name="healthyHabitsAndDiabetesPrevention.bmi"
        label="BMI"
        variant="outlined"
        error={errors.healthyHabitsAndDiabetesPrevention?.bmi}
        type="number"
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">BMI</InputAdornment>,
          },
        }}
        convertToNumber={true}
        required
      />

      <FormControl
        error={
          !!errors.healthyHabitsAndDiabetesPrevention
            ?.hasHadGlucoseOrA1CTestInPastYear
        }
        sx={{ width: "100%" }}
      >
        <FormLabel>
          Have you had a fasting glucose or A1c test in the past year?
        </FormLabel>
        <Controller
          name="healthyHabitsAndDiabetesPrevention.hasHadGlucoseOrA1CTestInPastYear"
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              value={field.value !== undefined ? String(field.value) : ""}
              onChange={(e) => field.onChange(e.target.value === "true")}
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          )}
        />
        <FormHelperText sx={{ m: 0 }}>
          {
            errors.healthyHabitsAndDiabetesPrevention
              ?.hasHadGlucoseOrA1CTestInPastYear?.message
          }
        </FormHelperText>
      </FormControl>

      <Typography>What was the result? (Put “NA” if not applicable)</Typography>
      <ControlledTextField
        control={control}
        name="healthyHabitsAndDiabetesPrevention.glucoseOrA1CTestResult"
        label="What was the result? (Put “NA” if not applicable)"
        variant="outlined"
        error={
          errors.healthyHabitsAndDiabetesPrevention?.glucoseOrA1CTestResult
        }
        required
      />

      <ControlledTextField
        control={control}
        name="healthyHabitsAndDiabetesPrevention.bloodPressure"
        label="Blood Pressure (e.g. 120/80)"
        variant="outlined"
        error={errors.healthyHabitsAndDiabetesPrevention?.bloodPressure}
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">mmHg</InputAdornment>,
          },
        }}
      />

      <FormControl
        error={
          !!errors.healthyHabitsAndDiabetesPrevention
            ?.movementAndActivityRanking
        }
        sx={{ width: "100%" }}
      >
        <FormLabel>
          On a scale of 1-5, rank your overall health when it comes to
          movement/activity:
        </FormLabel>
        <Controller
          name="healthyHabitsAndDiabetesPrevention.movementAndActivityRanking"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel value="1" control={<Radio />} label="1" />
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="3" control={<Radio />} label="3" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
              <FormControlLabel value="5" control={<Radio />} label="5" />
            </RadioGroup>
          )}
        />
        <FormHelperText sx={{ m: 0 }}>
          {
            errors.healthyHabitsAndDiabetesPrevention
              ?.movementAndActivityRanking?.message
          }
        </FormHelperText>
      </FormControl>

      {/* energy ranking */}
      <FormControl
        error={!!errors.healthyHabitsAndDiabetesPrevention?.energyRanking}
        sx={{ width: "100%" }}
      >
        <FormLabel>
          On a scale of 1-5, rank your overall health when it comes to energy:
        </FormLabel>
        <Controller
          name="healthyHabitsAndDiabetesPrevention.energyRanking"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel value="1" control={<Radio />} label="1" />
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="3" control={<Radio />} label="3" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
              <FormControlLabel value="5" control={<Radio />} label="5" />
            </RadioGroup>
          )}
        />
        <FormHelperText sx={{ m: 0 }}>
          {errors.healthyHabitsAndDiabetesPrevention?.energyRanking?.message}
        </FormHelperText>
      </FormControl>

      {/* sleep ranking */}
      <FormControl
        error={!!errors.healthyHabitsAndDiabetesPrevention?.sleepRanking}
        sx={{ width: "100%" }}
      >
        <FormLabel>
          On a scale of 1-5, rank your overall health when it comes to sleep:
        </FormLabel>
        <Controller
          name="healthyHabitsAndDiabetesPrevention.sleepRanking"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel value="1" control={<Radio />} label="1" />
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="3" control={<Radio />} label="3" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
              <FormControlLabel value="5" control={<Radio />} label="5" />
            </RadioGroup>
          )}
        />
        <FormHelperText sx={{ m: 0 }}>
          {errors.healthyHabitsAndDiabetesPrevention?.sleepRanking?.message}
        </FormHelperText>
      </FormControl>

      {/* emotional health ranking */}
      <FormControl
        error={
          !!errors.healthyHabitsAndDiabetesPrevention?.emotionalHealthRanking
        }
        sx={{ width: "100%" }}
      >
        <FormLabel>
          On a scale of 1-5, rank your overall health when it comes to emotional
          health:
        </FormLabel>
        <Controller
          name="healthyHabitsAndDiabetesPrevention.emotionalHealthRanking"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel value="1" control={<Radio />} label="1" />
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="3" control={<Radio />} label="3" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
              <FormControlLabel value="5" control={<Radio />} label="5" />
            </RadioGroup>
          )}
        />
        <FormHelperText sx={{ m: 0 }}>
          {
            errors.healthyHabitsAndDiabetesPrevention?.emotionalHealthRanking
              ?.message
          }
        </FormHelperText>
      </FormControl>

      {/* water bottles per day */}
      <FormControl
        error={!!errors.healthyHabitsAndDiabetesPrevention?.waterBottlesPerDay}
        sx={{ width: "100%" }}
      >
        <FormLabel>
          How many bottles of water (16.9 oz) do you currently drink on a daily
          basis?
        </FormLabel>
        <Controller
          name="healthyHabitsAndDiabetesPrevention.waterBottlesPerDay"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel value="1" control={<Radio />} label="1" />
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="3" control={<Radio />} label="3" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
              <FormControlLabel value="5+" control={<Radio />} label="5+" />
            </RadioGroup>
          )}
        />
        <FormHelperText sx={{ m: 0 }}>
          {
            errors.healthyHabitsAndDiabetesPrevention?.waterBottlesPerDay
              ?.message
          }
        </FormHelperText>
      </FormControl>

      {/* fruit and vegetable servings per day */}
      <FormControl
        error={
          !!errors.healthyHabitsAndDiabetesPrevention
            ?.fruitAndVegetableServingsPerDay
        }
        sx={{ width: "100%" }}
      >
        <FormLabel>
          How many servings of fruit and vegetables do you consume on a daily
          basis?
        </FormLabel>
        <Controller
          name="healthyHabitsAndDiabetesPrevention.fruitAndVegetableServingsPerDay"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel value="0" control={<Radio />} label="0" />
              <FormControlLabel value="1" control={<Radio />} label="1" />
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="3" control={<Radio />} label="3" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
              <FormControlLabel value="5" control={<Radio />} label="5" />
              <FormControlLabel value="6" control={<Radio />} label="6" />
              <FormControlLabel value="7" control={<Radio />} label="7" />
              <FormControlLabel value="8" control={<Radio />} label="8" />
              <FormControlLabel value="9" control={<Radio />} label="9" />
              <FormControlLabel value="10+" control={<Radio />} label="10+" />
            </RadioGroup>
          )}
        />
        <FormHelperText sx={{ m: 0 }}>
          {
            errors.healthyHabitsAndDiabetesPrevention
              ?.fruitAndVegetableServingsPerDay?.message
          }
        </FormHelperText>
      </FormControl>

      {/* other illness or injury */}
      <Typography>
        Do you have any other illness or injury we should be aware of? If
        applicable, please describe. If not, put “NA.”
      </Typography>
      <ControlledTextField
        control={control}
        name="healthyHabitsAndDiabetesPrevention.otherIllnessOrInjury"
        label="Do you have any other illness or injury we should be aware of? If applicable, please describe. If not, put “NA.”"
        variant="outlined"
        error={errors.healthyHabitsAndDiabetesPrevention?.otherIllnessOrInjury}
        multiline
        rows={3}
        required
      />

      {/* biggest healthy living challenge */}
      <Typography>
        What is your biggest healthy living challenge while out on the road?
      </Typography>
      <ControlledTextField
        control={control}
        name="healthyHabitsAndDiabetesPrevention.biggestHealthyLivingChallenge"
        label="What is your biggest healthy living challenge while out on the road?"
        variant="outlined"
        error={
          errors.healthyHabitsAndDiabetesPrevention
            ?.biggestHealthyLivingChallenge
        }
        multiline
        rows={3}
        required
      />

      {/* short term health goals */}
      <ControlledTextField
        control={control}
        name="healthyHabitsAndDiabetesPrevention.shortTermHealthGoals"
        label="What are your short-term health goals?"
        variant="outlined"
        error={errors.healthyHabitsAndDiabetesPrevention?.shortTermHealthGoals}
        multiline
        rows={3}
        required
      />

      {/* long term health goals */}
      <ControlledTextField
        control={control}
        name="healthyHabitsAndDiabetesPrevention.longTermHealthGoals"
        label="What are your long-term health goals?"
        variant="outlined"
        error={errors.healthyHabitsAndDiabetesPrevention?.longTermHealthGoals}
        multiline
        rows={3}
        required
      />
      {/* devices */}
      <Typography variant="h6">Devices</Typography>
      <Typography>Select the devices you currently use.</Typography>
      <Controller
        name="healthyHabitsAndDiabetesPrevention.devices.hasScale"
        control={control}
        render={({ field }) => (
          <>
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Scale"
            />
          </>
        )}
      />

      <Controller
        name="healthyHabitsAndDiabetesPrevention.devices.hasBloodPressureCuff"
        control={control}
        render={({ field }) => (
          <>
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Blood Pressure Cuff"
            />
          </>
        )}
      />

      <Controller
        name="healthyHabitsAndDiabetesPrevention.devices.hasGlucoseMonitor"
        control={control}
        render={({ field }) => (
          <>
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Glucose Monitor"
            />
          </>
        )}
      />

      <Controller
        name="healthyHabitsAndDiabetesPrevention.devices.hasA1cHomeTest"
        control={control}
        render={({ field }) => (
          <>
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="A1c Home Test"
            />
          </>
        )}
      />

      <Controller
        name="healthyHabitsAndDiabetesPrevention.devices.hasFitnessTracker"
        control={control}
        render={({ field }) => (
          <>
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Fitness Tracker (e.g., Fitbit, Apple Watch, Samsung Watch, etc)"
            />
          </>
        )}
      />

      <Controller
        name="healthyHabitsAndDiabetesPrevention.devices.hasBodyTapMeasure"
        control={control}
        render={({ field }) => (
          <>
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Body Tap Measure"
            />
          </>
        )}
      />

      <Controller
        name="healthyHabitsAndDiabetesPrevention.devices.hasResistanceBands"
        control={control}
        render={({ field }) => (
          <>
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Resistance Bands"
            />
          </>
        )}
      />

      <Controller
        name="healthyHabitsAndDiabetesPrevention.devices.hasOtherExerciseEquipment"
        control={control}
        render={({ field }) => (
          <>
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Other Exercise Equipment"
            />
          </>
        )}
      />

      <Controller
        name="healthyHabitsAndDiabetesPrevention.devices.noneOfTheAbove"
        control={control}
        render={({ field }) => (
          <>
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="None of the above"
            />
          </>
        )}
      />

      {/* healthy habits and diabetes prevention goals */}
      <Typography variant="h6">
        Healthy Habits and Diabetes Prevention Goals
      </Typography>
      {hasOptedInToHealthyHabits && (
        <>
          <Typography>
            What are your hopeful learnings and/or goals for healthy habits and
            diabetes prevention?
          </Typography>
          <ControlledTextField
            control={control}
            name="healthyHabitsAndDiabetesPrevention.healthyHabitsHopefulLearnings"
            label="What are your hopeful learnings for healthy habits?"
            variant="outlined"
            error={
              errors.healthyHabitsAndDiabetesPrevention
                ?.healthyHabitsHopefulLearnings
            }
            multiline
            rows={3}
            required
          />
        </>
      )}

      {hasOptedInToDiabetesPrevention && (
        <>
          <Typography>
            What are your hopeful learnings and/or goals for diabetes
            prevention?
          </Typography>
          <ControlledTextField
            control={control}
            name="healthyHabitsAndDiabetesPrevention.diabetesPreventionHopefulLearnings"
            label="What are your hopeful learnings for diabetes prevention?"
            variant="outlined"
            error={
              errors.healthyHabitsAndDiabetesPrevention
                ?.diabetesPreventionHopefulLearnings
            }
            multiline
            rows={3}
            required
          />
        </>
      )}
    </>
  );
}
