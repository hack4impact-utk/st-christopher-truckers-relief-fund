/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { Control, Controller, UseFormWatch } from "react-hook-form";

import ControlledTextField from "@/components/controlled/ControlledTextField";
import CigarettesFagerstormQuestionsQuestions from "@/components/EnrollmentForm/ProgramSpecificQuestions/FagerstormQuestions/CigarettesFagerstormQuestions";
import SmokelessTobaccoFagerstormQuestions from "@/components/EnrollmentForm/ProgramSpecificQuestions/FagerstormQuestions/SmokelessTobaccoFagerstormQuestions";

type RigsWithoutCigsProgramSpecificQuestionsProps = {
  control: Control<any>;
  errors: any;
  watch: UseFormWatch<any>;
};

export default function RigsWithoutCigsProgramSpecificQuestions({
  control,
  errors,
  watch,
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

      {watch("rigsWithoutCigs.tobaccoForm.doesUseCigarettes") && (
        <CigarettesFagerstormQuestionsQuestions
          control={control}
          errors={errors}
        />
      )}
      {watch("rigsWithoutCigs.tobaccoForm.doesUseSmokelessTobacco") && (
        <SmokelessTobaccoFagerstormQuestions
          control={control}
          errors={errors}
        />
      )}

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
        name="rigsWithoutCigs.methodsUsedToQuit.hasUsedAudiobook"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Audiobook"
          />
        )}
      />
      <Controller
        name="rigsWithoutCigs.methodsUsedToQuit.hasUsedChantix"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Chantix"
          />
        )}
      />
      <Controller
        name="rigsWithoutCigs.methodsUsedToQuit.hasUsedColdTurkey"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Cold Turkey"
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
        name="rigsWithoutCigs.methodsUsedToQuit.hasUsedGrindsCoffeePouches"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Grinds Coffee Pouches"
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
        name="rigsWithoutCigs.methodsUsedToQuit.hasUsedLozenges"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Lozenges"
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
        name="rigsWithoutCigs.methodsUsedToQuit.hasUsedMobileApp"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Mobile App"
          />
        )}
      />
      <Controller
        name="rigsWithoutCigs.methodsUsedToQuit.hasUsedNicotinePatch"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Nicotine Patch"
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
        name="rigsWithoutCigs.methodsUsedToQuit.hasUsedTaperMethod"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Taper Method"
          />
        )}
      />
      <Controller
        name="rigsWithoutCigs.methodsUsedToQuit.hasUsedVarenicline"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Varenicline"
          />
        )}
      />
      <Controller
        name="rigsWithoutCigs.methodsUsedToQuit.hasUsedWellbutrin"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Wellbutrin"
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
