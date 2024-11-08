"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
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
import { Controller, useForm } from "react-hook-form";

import ControlledTextField from "@/components/controlled/ControlledTextField";
import {
  ProgramSpecificQuestionsSection,
  programSpecificQuestionsSectionValidator,
} from "@/types/EnrollmentForm";

export default function ProgramSpecificQuestionsFormSection() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProgramSpecificQuestionsSection>({
    resolver: zodResolver(programSpecificQuestionsSectionValidator),
    defaultValues: {
      hasOptedInToHealthyHabits: false,
      hasOptedInToDiabetesPrevention: false,
      hasOptedInToRigsWithoutCigs: false,
      hasOptedInToVaccineVoucher: false,
      hasOptedInToGetPreventativeScreenings: false,
      healthyHabitsAndDiabetesPrevention: {
        weight: 0,
        bmi: 0,
        hasHadGlucoseOrA1CTestInPastYear: false,
        glucoseOrA1CTestResult: "",
        bloodPressure: "",
        movementAndActivityRanking: "1",
        energyRanking: "1",
        sleepRanking: "1",
        emotionalHealthRanking: "1",
        waterBottlesPerDay: "1",
        fruitAndVegetableServingsPerDay: "0",
        otherIllnessOrInjury: "",
        biggestHealthyLivingChallenge: "",
        shortTermHealthGoals: "",
        longTermHealthGoals: "",
        devices: {
          hasScale: false,
          hasBloodPressureCuff: false,
          hasGlucoseMonitor: false,
          hasA1cHomeTest: false,
          hasFitnessTracker: false,
          hasBodyTapMeasure: false,
          hasResistanceBands: false,
          hasOtherExerciseEquipment: false,
          noneOfTheAbove: false,
        },
        healthyHabitsHopefulLearnings: "",
        diabetesPreventionHopefulLearnings: "",
      },
      rigsWithoutCigs: {
        tobaccoForm: {
          doesUseCigarettes: false,
          doesUseSmokelessTobacco: false,
        },
        firstCigaretteTime: "Within 5 minutes",
        doesFindItDifficultToNotSmokeInNonSmokingAreas: false,
        hardestCigaretteToGiveUp: "The first one in the morning",
        cigarettesPerDay: 0,
        smokesMoreOftenInTheMorning: false,
        smokesEvenWhenSickInBed: false,
        plansToJoinFacebookGroup: false,
        whyDoYouWantToQuitSmoking: "",
        howCanWeHelpYou: "",
        referralSource: "Website",
        accountabilityPerson: {
          firstName: "",
          lastName: "",
          phoneNumber: "",
          relationshipToAccountabilityPerson: "Friend",
        },
        currentlyHasPrimaryCarePhysician: false,
      },
      vaccineVoucher: {
        vaccines: {
          wantsFluVaccine: false,
          wantsPneumoniaVaccine: false,
          wantsShinglesVaccine: false,
          wantsCovid19Vaccine: false,
        },
        voucherLocation: "Walgreens",
        additionalQuestions: "",
      },
      getPreventativeScreenings: {
        agreeToProvideAccountability: false,
        prostateScreening: {
          agreeToGetAccountRegistered: false,
          agreesToProstateScreening: false,
          isNotApplicable: false,
          additionalQuestions: "",
        },
      },
    },
  });

  const onSubmit = async (data: ProgramSpecificQuestionsSection) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          width: "min(90vw, 700px)",
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: "1fr",
        }}
      >
        {/* Title: Enrollment Form */}
        <Typography variant="h4">Program Specific Questions</Typography>
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
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
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
              endAdornment: (
                <InputAdornment position="end">mmHg</InputAdornment>
              ),
            },
          }}
        />

        <FormControl
          error={!!errors.healthyHabitsAndDiabetesPrevention?.sleepRanking}
          sx={{ width: "100%" }}
        >
          <FormLabel>
            Have you had a fasting glucose or A1c test in the past year?
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
            On a scale of 1-5, rank your overall health when it comes to
            emotional health:
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
          error={
            !!errors.healthyHabitsAndDiabetesPrevention?.waterBottlesPerDay
          }
          sx={{ width: "100%" }}
        >
          <FormLabel>
            How many bottles of water (16.9 oz) do you currently drink on a
            daily basis?
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
              <RadioGroup
                {...field}
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(e.target.value === "true")}
              >
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
        <ControlledTextField
          control={control}
          name="healthyHabitsAndDiabetesPrevention.otherIllnessOrInjury"
          label="Do you have any other illness or injury we should be aware of? If applicable, please describe. If not, put “NA.”"
          variant="outlined"
          error={
            errors.healthyHabitsAndDiabetesPrevention?.otherIllnessOrInjury
          }
          multiline
          rows={3}
          required
        />

        {/* biggest healthy living challenge */}
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
          error={
            errors.healthyHabitsAndDiabetesPrevention?.shortTermHealthGoals
          }
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

        <Divider />

        <Typography variant="h4">Rigs for Cigs</Typography>

        <Typography variant="h6">What form of tobacco do you use?</Typography>
        <Controller
          name="rigsWithoutCigs.tobaccoForm.doesUseCigarettes"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Cigarettes"
            />
          )}
        />
        <Controller
          name="rigsWithoutCigs.tobaccoForm.doesUseSmokelessTobacco"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Smokeless"
            />
          )}
        />

        <ControlledTextField
          control={control}
          name="rigsWithoutCigs.tobaccoUsageLength"
          label="How long have you been using tobacco?"
          variant="outlined"
          error={errors.rigsWithoutCigs?.tobaccoUsageLength}
          required
        />

        <FormControl
          error={!!errors.rigsWithoutCigs?.isFirstTimeTryingToQuit?.message}
          sx={{ width: "100%" }}
        >
          <FormLabel>Is this your first time trying to quit?</FormLabel>
          <Controller
            name="rigsWithoutCigs.isFirstTimeTryingToQuit"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(e.target.value === "true")}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.rigsWithoutCigs?.isFirstTimeTryingToQuit?.message}
          </FormHelperText>
        </FormControl>

        <Typography variant="h6">
          What methods have you used to quit in the past?
        </Typography>
        <Controller
          name="rigsWithoutCigs.methodsUsedToQuit.hasTriedColdTurkey"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Cold turkey"
            />
          )}
        />
        <Controller
          name="rigsWithoutCigs.methodsUsedToQuit.hasUsedNicotinePatch"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Nicotine patch"
            />
          )}
        />
        <Controller
          name="rigsWithoutCigs.methodsUsedToQuit.hasUsedGum"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Gum"
            />
          )}
        />
        <Controller
          name="rigsWithoutCigs.methodsUsedToQuit.hasUsedHypnosis"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Hypnosis"
            />
          )}
        />
        <Controller
          name="rigsWithoutCigs.methodsUsedToQuit.hasUsedMedication"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Medication"
            />
          )}
        />
        <Controller
          name="rigsWithoutCigs.methodsUsedToQuit.hasUsedECigarettes"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="E-cigarettes"
            />
          )}
        />
        <Controller
          name="rigsWithoutCigs.methodsUsedToQuit.hasUsedOther"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Other"
            />
          )}
        />
        <Controller
          name="rigsWithoutCigs.methodsUsedToQuit.hasNotTriedToQuit"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="I have not tried to quit"
            />
          )}
        />

        <FormControl
          error={!!errors.rigsWithoutCigs?.firstCigaretteTime?.message}
          sx={{ width: "100%" }}
        >
          <FormLabel>
            How soon after waking do you smoke your first cigarette?
          </FormLabel>
          <Controller
            name="rigsWithoutCigs.firstCigaretteTime"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControlLabel
                  value="Within 5 minutes"
                  control={<Radio />}
                  label="Within 5 minutes"
                />
                <FormControlLabel
                  value="Within 5-30 minutes"
                  control={<Radio />}
                  label="Within 5-30 minutes"
                />
                <FormControlLabel
                  value="Within 30-60 minutes"
                  control={<Radio />}
                  label="Within 30-60 minutes"
                />
                <FormControlLabel
                  value="Longer than 60 minutes"
                  control={<Radio />}
                  label="Longer than 60 minutes"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.rigsWithoutCigs?.firstCigaretteTime?.message}
          </FormHelperText>
        </FormControl>

        <FormControl
          error={
            !!errors.rigsWithoutCigs
              ?.doesFindItDifficultToNotSmokeInNonSmokingAreas?.message
          }
          sx={{ width: "100%" }}
        >
          <FormLabel>
            Do you find it difficult to not smoke in non-smoking areas?
          </FormLabel>
          <Controller
            name="rigsWithoutCigs.doesFindItDifficultToNotSmokeInNonSmokingAreas"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(e.target.value === "true")}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {
              errors.rigsWithoutCigs
                ?.doesFindItDifficultToNotSmokeInNonSmokingAreas?.message
            }
          </FormHelperText>
        </FormControl>

        <FormControl
          error={!!errors.rigsWithoutCigs?.hardestCigaretteToGiveUp?.message}
          sx={{ width: "100%" }}
        >
          <FormLabel>What is your hardest cigarette to give up?</FormLabel>
          <Controller
            name="rigsWithoutCigs.hardestCigaretteToGiveUp"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControlLabel
                  value="The first one in the morning"
                  control={<Radio />}
                  label="The first one in the morning"
                />
                <FormControlLabel
                  value="Any other"
                  control={<Radio />}
                  label="Any other"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.rigsWithoutCigs?.hardestCigaretteToGiveUp?.message}
          </FormHelperText>
        </FormControl>

        <ControlledTextField
          control={control}
          name="rigsWithoutCigs.cigarettesPerDay"
          label="How many cigarettes do you smoke daily? (1-100)"
          variant="outlined"
          error={errors.rigsWithoutCigs?.cigarettesPerDay}
          type="number"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">cigarettes</InputAdornment>
              ),
            },
          }}
          convertToNumber={true}
          required
        />

        <FormControl
          error={!!errors.rigsWithoutCigs?.smokesMoreOftenInTheMorning?.message}
          sx={{ width: "100%" }}
        >
          <FormLabel>Do you smoke more often in the morning?</FormLabel>
          <Controller
            name="rigsWithoutCigs.smokesMoreOftenInTheMorning"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(e.target.value === "true")}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.rigsWithoutCigs?.smokesMoreOftenInTheMorning?.message}
          </FormHelperText>
        </FormControl>

        <FormControl
          error={!!errors.rigsWithoutCigs?.smokesEvenWhenSickInBed?.message}
          sx={{ width: "100%" }}
        >
          <FormLabel>
            Do you smoke even when sick in bed most of the day?
          </FormLabel>
          <Controller
            name="rigsWithoutCigs.smokesEvenWhenSickInBed"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(e.target.value === "true")}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.rigsWithoutCigs?.smokesEvenWhenSickInBed?.message}
          </FormHelperText>
        </FormControl>

        <FormControl
          error={!!errors.rigsWithoutCigs?.plansToJoinFacebookGroup?.message}
          sx={{ width: "100%" }}
        >
          <FormLabel>
            Do you plan to join our Facebook group for support?
          </FormLabel>
          <Controller
            name="rigsWithoutCigs.plansToJoinFacebookGroup"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(e.target.value === "true")}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.rigsWithoutCigs?.plansToJoinFacebookGroup?.message}
          </FormHelperText>
        </FormControl>

        <Typography variant="h6">Why do you want to quit smoking?</Typography>
        <ControlledTextField
          control={control}
          name="rigsWithoutCigs.whyDoYouWantToQuitSmoking"
          label="Why do you want to quit smoking?"
          variant="outlined"
          error={errors.rigsWithoutCigs?.whyDoYouWantToQuitSmoking}
          multiline
          rows={3}
          required
        />

        <Typography variant="h6">How can we help you?</Typography>
        <ControlledTextField
          control={control}
          name="rigsWithoutCigs.howCanWeHelpYou"
          label="How can we help you?"
          variant="outlined"
          error={errors.rigsWithoutCigs?.howCanWeHelpYou}
          multiline
          rows={3}
          required
        />

        <FormControl
          error={!!errors.rigsWithoutCigs?.referralSource?.message}
          sx={{ width: "100%" }}
        >
          <FormLabel>
            How did you learn about the Rigs without Cigs program?
          </FormLabel>
          <Controller
            name="rigsWithoutCigs.referralSource"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControlLabel
                  value="Website"
                  control={<Radio />}
                  label="Website"
                />
                <FormControlLabel
                  value="Friend"
                  control={<Radio />}
                  label="Friend"
                />
                <FormControlLabel
                  value="Social Media"
                  control={<Radio />}
                  label="Social Media"
                />
                <FormControlLabel value="SCF" control={<Radio />} label="SCF" />
                <FormControlLabel
                  value="Radio-Dave Nemo"
                  control={<Radio />}
                  label="Radio-Dave Nemo"
                />
                <FormControlLabel
                  value="Radio-Tim Ridley Show"
                  control={<Radio />}
                  label="Radio-Tim Ridley Show"
                />
                <FormControlLabel
                  value="Radio-KC Phillips-Road Dog Live"
                  control={<Radio />}
                  label="Radio-KC Phillips-Road Dog Live"
                />
                <FormControlLabel
                  value="Radio-Erice Harley-Red Eye Radio"
                  control={<Radio />}
                  label="Radio-Erice Harley-Red Eye Radio"
                />
                <FormControlLabel
                  value="Radio-Other"
                  control={<Radio />}
                  label="Radio-Other"
                />
                <FormControlLabel
                  value="Prime Inc"
                  control={<Radio />}
                  label="Prime Inc"
                />
                <FormControlLabel
                  value="Rolling Strong"
                  control={<Radio />}
                  label="Rolling Strong"
                />
                <FormControlLabel
                  value="AAOO"
                  control={<Radio />}
                  label="AAOO"
                />
                <FormControlLabel
                  value="Enrollment Form prompt"
                  control={<Radio />}
                  label="Enrollment Form prompt"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.rigsWithoutCigs?.referralSource?.message}
          </FormHelperText>
        </FormControl>

        <ControlledTextField
          control={control}
          name="rigsWithoutCigs.accountabilityPerson.firstName"
          label="Accountability Person's First Name"
          variant="outlined"
          error={errors.rigsWithoutCigs?.accountabilityPerson?.firstName}
          required
        />

        <ControlledTextField
          control={control}
          name="rigsWithoutCigs.accountabilityPerson.lastName"
          label="Accountability Person's Last Name"
          variant="outlined"
          error={errors.rigsWithoutCigs?.accountabilityPerson?.lastName}
          required
        />

        <ControlledTextField
          control={control}
          name="rigsWithoutCigs.accountabilityPerson.phoneNumber"
          label="Accountability Person's Phone Number"
          variant="outlined"
          error={errors.rigsWithoutCigs?.accountabilityPerson?.phoneNumber}
          type="tel"
          required
        />

        <FormControl
          error={
            !!errors.rigsWithoutCigs?.accountabilityPerson
              ?.relationshipToAccountabilityPerson?.message
          }
          sx={{ width: "100%" }}
        >
          <FormLabel>
            What is the relationship to the accountability person?
          </FormLabel>
          <Controller
            name="rigsWithoutCigs.accountabilityPerson.relationshipToAccountabilityPerson"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControlLabel
                  value="Friend"
                  control={<Radio />}
                  label="Friend"
                />
                <FormControlLabel
                  value="Coworker"
                  control={<Radio />}
                  label="Coworker"
                />
                <FormControlLabel
                  value="Spouse"
                  control={<Radio />}
                  label="Spouse"
                />
                <FormControlLabel
                  value="Significant other"
                  control={<Radio />}
                  label="Significant other"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {
              errors.rigsWithoutCigs?.accountabilityPerson
                ?.relationshipToAccountabilityPerson?.message
            }
          </FormHelperText>
        </FormControl>

        <FormControl
          error={
            !!errors.rigsWithoutCigs?.currentlyHasPrimaryCarePhysician?.message
          }
          sx={{ width: "100%" }}
        >
          <FormLabel>Do you currently have a primary care physician?</FormLabel>
          <Controller
            name="rigsWithoutCigs.currentlyHasPrimaryCarePhysician"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(e.target.value === "true")}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.rigsWithoutCigs?.currentlyHasPrimaryCarePhysician?.message}
          </FormHelperText>
        </FormControl>

        <Divider />

        <Typography variant="h4">Vaccine Voucher</Typography>

        <Typography>Select the vaccines you currently want.</Typography>
        {/* checkboxes */}
        <Controller
          name="vaccineVoucher.vaccines.wantsFluVaccine"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Flu"
            />
          )}
        />
        <Controller
          name="vaccineVoucher.vaccines.wantsPneumoniaVaccine"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Pneumonia"
            />
          )}
        />
        <Controller
          name="vaccineVoucher.vaccines.wantsShinglesVaccine"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Shingles"
            />
          )}
        />
        <Controller
          name="vaccineVoucher.vaccines.wantsCovid19Vaccine"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="COVID-19"
            />
          )}
        />

        <FormControl
          error={!!errors.vaccineVoucher?.voucherLocation?.message}
          sx={{ width: "100%" }}
        >
          <FormLabel>Where do you want to get your vaccine voucher?</FormLabel>
          <Controller
            name="vaccineVoucher.voucherLocation"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControlLabel
                  value="Walgreens"
                  control={<Radio />}
                  label="Walgreens"
                />
                <FormControlLabel
                  value="Kroger and Kroger Family of Pharmacies"
                  control={<Radio />}
                  label="Kroger and Kroger Family of Pharmacies"
                />
                <FormControlLabel
                  value="The Little Clinic"
                  control={<Radio />}
                  label="The Little Clinic"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.rigsWithoutCigs?.referralSource?.message}
          </FormHelperText>
        </FormControl>

        <ControlledTextField
          control={control}
          name="vaccineVoucher.additionalQuestions"
          label="Additional questions"
          variant="outlined"
          error={errors.vaccineVoucher?.additionalQuestions}
          multiline
          rows={3}
        />

        <Divider />

        <Typography variant="h4">Get Preventative Screenings</Typography>

        <FormControl
          error={
            !!errors.getPreventativeScreenings?.agreeToProvideAccountability
              ?.message
          }
          sx={{ width: "100%" }}
        >
          <FormLabel>
            Do you agree to provide accountability for your health?
          </FormLabel>
          <Controller
            name="getPreventativeScreenings.agreeToProvideAccountability"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(e.target.value === "true")}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {
              errors.getPreventativeScreenings?.agreeToProvideAccountability
                ?.message
            }
          </FormHelperText>
        </FormControl>

        <Controller
          name="getPreventativeScreenings.prostateScreening.agreeToGetAccountRegistered"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="By checking this box, I acknowledge that the St. Christopher Fund 
              will create an account on my behalf through Call on Doc
               for the purpose of requesting a test kit, 
               providing results, and referral to resources
                if results are positive."
            />
          )}
        />
        <Controller
          name="getPreventativeScreenings.prostateScreening.agreesToProstateScreening"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="By checking this box, I am choosing to register myself 
              for the prostate cancer screening. 
              I will expect a follow-up email with information 
              needed to register"
            />
          )}
        />
        <Controller
          name="getPreventativeScreenings.prostateScreening.isNotApplicable"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Not Applicable"
            />
          )}
        />

        <ControlledTextField
          control={control}
          name="getPreventativeScreenings.prostateScreening.additionalQuestions"
          label="Additional questions"
          variant="outlined"
          error={
            errors.getPreventativeScreenings?.prostateScreening
              ?.additionalQuestions
          }
          multiline
          rows={3}
        />

        {/* Submit */}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>

        <Typography variant="h6" fontWeight="normal" color="red">
          {errors.root?.message}
        </Typography>
      </Box>
    </form>
  );
}
