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
import { ReactNode } from "react";
import { Control, Controller } from "react-hook-form";

import ControlledTextField from "@/components/controlled/ControlledTextField";

type RigsWithoutCigsProgramSpecificQuestionsProps = {
  control: Control<any>;
  errors: any;
};

export default function RigsWithoutCigsProgramSpecificQuestions({
  control,
  errors,
}: RigsWithoutCigsProgramSpecificQuestionsProps): ReactNode {
  return (
    <>
      <Divider />
      <Typography variant="h4">Rigs for Cigs</Typography>

      <Typography variant="h6">General</Typography>

      <Typography>What form of tobacco do you use?</Typography>
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

      <Typography>How long have you been using tobacco?</Typography>
      <ControlledTextField
        control={control}
        name="rigsWithoutCigs.tobaccoUsageLength"
        label="How long have you been using tobacco?"
        variant="outlined"
        error={errors.rigsWithoutCigs?.tobaccoUsageLength}
        required
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
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
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

      <Typography>How many cigarettes do you smoke daily? (1-100)</Typography>
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
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
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
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
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
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          )}
        />
        <FormHelperText sx={{ m: 0 }}>
          {errors.rigsWithoutCigs?.plansToJoinFacebookGroup?.message}
        </FormHelperText>
      </FormControl>

      <Typography>Why do you want to quit smoking?</Typography>
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

      <Typography>How can we help you?</Typography>
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
              <FormControlLabel value="AAOO" control={<Radio />} label="AAOO" />
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

      <Divider />

      <Typography variant="h6">Methods of Quitting</Typography>
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
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          )}
        />
        <FormHelperText sx={{ m: 0 }}>
          {errors.rigsWithoutCigs?.isFirstTimeTryingToQuit?.message}
        </FormHelperText>
      </FormControl>
      <Typography>What methods have you used to quit in the past?</Typography>
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

      <Divider />

      <Typography variant="h6">Accountability Person</Typography>
      <Typography>
        Please provide the name, phone number, and relationship to a person who
        can help you quit smoking.
      </Typography>

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

      <Divider />
      <Typography variant="h6">Healthcare</Typography>

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
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          )}
        />
        <FormHelperText sx={{ m: 0 }}>
          {errors.rigsWithoutCigs?.currentlyHasPrimaryCarePhysician?.message}
        </FormHelperText>
      </FormControl>
    </>
  );
}
