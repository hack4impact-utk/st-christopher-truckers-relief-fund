import { Box } from "@mui/material";
import { ReactNode } from "react";

import FormResponse from "@/components/SCFModal/FormResponse";
import FormSection from "@/components/SCFModal/FormSection";
import FormSubsection from "@/components/SCFModal/FormSubsection";
import { ProgramSpecificQuestionsSection } from "@/types";

type RigsWithoutCigsResponsesProps = {
  programSpecificQuestionsSection: ProgramSpecificQuestionsSection;
};

export default function RigsWithoutCigsResponses({
  programSpecificQuestionsSection,
}: Readonly<RigsWithoutCigsResponsesProps>): ReactNode {
  const typesOfTobaccoUsed = [
    {
      label: "Cigarettes",
      value: programSpecificQuestionsSection.rigsWithoutCigs.tobaccoForm
        .doesUseCigarettes
        ? "Yes"
        : "No",
    },
    {
      label: "Smokeless Tobacco",
      value: programSpecificQuestionsSection.rigsWithoutCigs.tobaccoForm
        .doesUseSmokelessTobacco
        ? "Yes"
        : "No",
    },
  ];

  const cigaretteFagerstromTestResponses = [
    {
      label: "Cigarette Fagerstrom Test",
      value:
        programSpecificQuestionsSection.rigsWithoutCigs
          .cigaretteFagerstromScore,
    },
    {
      label: "First Smoke Time",
      value: programSpecificQuestionsSection.rigsWithoutCigs.firstSmokeTime,
    },
    {
      label: "Is Difficult to Not Smoke in Forbidden Areas",
      value: programSpecificQuestionsSection.rigsWithoutCigs
        .isDifficultToNotSmokeInForbiddenAreas
        ? "Yes"
        : "No",
    },
    {
      label: "Cigarette Hate to Give Up",
      value:
        programSpecificQuestionsSection.rigsWithoutCigs.cigaretteHateToGiveUp,
    },
    {
      label: "Cigarettes Per Day",
      value: programSpecificQuestionsSection.rigsWithoutCigs.cigarettesPerDay,
    },
    {
      label: "Smoke More in Morning",
      value: programSpecificQuestionsSection.rigsWithoutCigs.smokeMoreInMorning
        ? "Yes"
        : "No",
    },
    {
      label: "Smoke When Ill",
      value: programSpecificQuestionsSection.rigsWithoutCigs.smokeWhenIll
        ? "Yes"
        : "No",
    },
  ];

  const smokelessTobaccoFagerstromTestResponses = [
    {
      label: "Smokeless Tobacco Fagerstrom Test",
      value:
        programSpecificQuestionsSection.rigsWithoutCigs.tobaccoFagerstromScore,
    },
    {
      label: "First Tobacco Time",
      value: programSpecificQuestionsSection.rigsWithoutCigs.firstTobaccoTime,
    },
    {
      label: "Swallow Tobacco Juice",
      value:
        programSpecificQuestionsSection.rigsWithoutCigs.swallowTobaccoJuice,
    },
    {
      label: "Tobacco Hate to Give Up",
      value:
        programSpecificQuestionsSection.rigsWithoutCigs.tobaccoHateToGiveUp,
    },
    {
      label: "Tobacco Cans Per Week",
      value: programSpecificQuestionsSection.rigsWithoutCigs.tobaccoCansPerWeek,
    },
    {
      label: "Tobacco Chew More After Awakening",
      value: programSpecificQuestionsSection.rigsWithoutCigs
        .tobaccoChewMoreAfterAwakening
        ? "Yes"
        : "No",
    },
    {
      label: "Tobacco Chew When Ill",
      value: programSpecificQuestionsSection.rigsWithoutCigs.tobaccoChewWhenIll
        ? "Yes"
        : "No",
    },
  ];

  const miscellaneousResponses = [
    {
      label: "Tobacco Usage Length",
      value: programSpecificQuestionsSection.rigsWithoutCigs.tobaccoUsageLength,
    },
    {
      label: "First Time Trying to Quit?",
      value: programSpecificQuestionsSection.rigsWithoutCigs
        .isFirstTimeTryingToQuit
        ? "Yes"
        : "No",
    },
    {
      label: "Plans to Join Facebook Group",
      value: programSpecificQuestionsSection.rigsWithoutCigs
        .plansToJoinFacebookGroup
        ? "Yes"
        : "No",
    },
    {
      label: "Reason for Quitting Smoking",
      value:
        programSpecificQuestionsSection.rigsWithoutCigs
          .whyDoYouWantToQuitSmoking,
    },
    {
      label: "How to Help",
      value: programSpecificQuestionsSection.rigsWithoutCigs.howCanWeHelpYou,
    },
    {
      label: "Referral Source",
      value: programSpecificQuestionsSection.rigsWithoutCigs.referralSource,
    },
    {
      label: "Has Primary Care Physician",
      value: programSpecificQuestionsSection.rigsWithoutCigs
        .currentlyHasPrimaryCarePhysician
        ? "Yes"
        : "No",
    },
  ];

  const accountabilityPersonResponses = [
    {
      label: "Accountability Person First Name",
      value:
        programSpecificQuestionsSection.rigsWithoutCigs.accountabilityPerson
          .firstName,
    },
    {
      label: "Accountability Person Last Name",
      value:
        programSpecificQuestionsSection.rigsWithoutCigs.accountabilityPerson
          .lastName,
    },
    {
      label: "Accountability Person Phone Number",
      value:
        programSpecificQuestionsSection.rigsWithoutCigs.accountabilityPerson
          .phoneNumber,
    },
    {
      label: "Relationship to Accountability Person",
      value:
        programSpecificQuestionsSection.rigsWithoutCigs.accountabilityPerson
          .relationshipToAccountabilityPerson,
    },
  ];

  const attemptedQuittingMethods = [
    {
      label: "Not Tried To Quit",
      value: programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
        .hasNotTriedToQuit
        ? "Yes"
        : "No",
    },
    {
      label: "Cold Turkey",
      value: programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
        .hasTriedColdTurkey
        ? "Yes"
        : "No",
    },
    {
      label: "Audiobook",
      value: programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
        .hasUsedAudiobook
        ? "Yes"
        : "No",
    },
    {
      label: "Chantix",
      value: programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
        .hasUsedChantix
        ? "Yes"
        : "No",
    },
    {
      label: "E-Cigarettes",
      value: programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
        .hasUsedECigarettes
        ? "Yes"
        : "No",
    },
    {
      label: "Grinds Coffee Pouches",
      value: programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
        .hasUsedGrindsCoffeePouches
        ? "Yes"
        : "No",
    },
    {
      label: "Gum",
      value: programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
        .hasUsedGum
        ? "Yes"
        : "No",
    },
    {
      label: "Hypnosis",
      value: programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
        .hasUsedHypnosis
        ? "Yes"
        : "No",
    },
    {
      label: "Lozenges",
      value: programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
        .hasUsedLozenges
        ? "Yes"
        : "No",
    },
    {
      label: "Medication",
      value: programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
        .hasUsedMedication
        ? "Yes"
        : "No",
    },
    {
      label: "Mobile App",
      value: programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
        .hasUsedMobileApp
        ? "Yes"
        : "No",
    },
    {
      label: "Nicotine Patch",
      value: programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
        .hasUsedNicotinePatch
        ? "Yes"
        : "No",
    },
    {
      label: "Other",
      value: programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
        .hasUsedOther
        ? "Yes"
        : "No",
    },
    {
      label: "Taper Method",
      value: programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
        .hasUsedTaperMethod
        ? "Yes"
        : "No",
    },
    {
      label: "Varenicline",
      value: programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
        .hasUsedVarenicline
        ? "Yes"
        : "No",
    },
    {
      label: "Wellbutrin",
      value: programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
        .hasUsedWellbutrin
        ? "Yes"
        : "No",
    },
  ];

  return (
    <Box mb={2}>
      <FormSection title="Rigs Without Cigs Responses">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <FormSubsection title="Types of Tobacco Used">
              {typesOfTobaccoUsed.map((tobacco) => (
                <FormResponse
                  key={tobacco.label}
                  label={tobacco.label}
                  value={tobacco.value}
                  isListItem
                />
              ))}
            </FormSubsection>
          </Box>

          {programSpecificQuestionsSection.rigsWithoutCigs.tobaccoForm
            .doesUseCigarettes && (
            <FormSubsection title="Cigarette Fagerstrom Test">
              {cigaretteFagerstromTestResponses.map((response) => (
                <FormResponse
                  key={response.label}
                  label={response.label}
                  value={response.value}
                  isListItem
                />
              ))}
            </FormSubsection>
          )}

          {programSpecificQuestionsSection.rigsWithoutCigs.tobaccoForm
            .doesUseSmokelessTobacco && (
            <FormSubsection title="Smokeless Tobacco Fagerstrom Test">
              {smokelessTobaccoFagerstromTestResponses.map((response) => (
                <FormResponse
                  key={response.label}
                  label={response.label}
                  value={response.value}
                  isListItem
                />
              ))}
            </FormSubsection>
          )}

          <FormSubsection title="Attempted Quitting Methods">
            {attemptedQuittingMethods.map((method) => (
              <FormResponse
                key={method.label}
                label={method.label}
                value={method.value}
                isListItem
              />
            ))}
          </FormSubsection>

          <FormSubsection title="Accountability Person">
            {accountabilityPersonResponses.map((response) => (
              <FormResponse
                key={response.label}
                label={response.label}
                value={response.value}
                isListItem
              />
            ))}
          </FormSubsection>

          <FormSubsection title="Miscellaneous">
            {miscellaneousResponses.map((response) => (
              <FormResponse
                key={response.label}
                label={response.label}
                value={response.value}
                isListItem
              />
            ))}
          </FormSubsection>
        </Box>
      </FormSection>
    </Box>
  );
}
