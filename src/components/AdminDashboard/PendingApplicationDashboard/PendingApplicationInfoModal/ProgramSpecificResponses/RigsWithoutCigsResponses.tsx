import { Box, Typography } from "@mui/material";

import FormResponse from "@/components/AdminDashboard/PendingApplicationDashboard/PendingApplicationInfoModal/FormResponse";
import { ProgramSpecificQuestionsSection } from "@/types/EnrollmentForm";

type RigsWithoutCigsResponsesProps = {
  programSpecificQuestionsSection: ProgramSpecificQuestionsSection;
};

export default function RigsWithoutCigsResponses({
  programSpecificQuestionsSection,
}: RigsWithoutCigsResponsesProps) {
  return (
    <Box mb={2}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ textDecoration: "underline" }}
      >
        Rigs Without Cigs Responses
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography style={{ textDecoration: "underline" }}>
            Tobacco Used:
          </Typography>
          <FormResponse
            label="Cigarettes"
            value={
              programSpecificQuestionsSection.rigsWithoutCigs.tobaccoForm
                .doesUseCigarettes
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />
          <FormResponse
            label="Smokeless Tobacco"
            value={
              programSpecificQuestionsSection.rigsWithoutCigs.tobaccoForm
                .doesUseSmokelessTobacco
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />
        </Box>

        <FormResponse
          label="Tobacco Usage Length"
          value={
            programSpecificQuestionsSection.rigsWithoutCigs.tobaccoUsageLength
          }
        />
        <FormResponse
          label="First Time Trying to Quit?"
          value={
            programSpecificQuestionsSection.rigsWithoutCigs
              .isFirstTimeTryingToQuit
              ? "Yes"
              : "No"
          }
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography style={{ textDecoration: "underline" }}>
            Attempted Quitting Methods:
          </Typography>

          <FormResponse
            label="Cold Turkey"
            value={
              programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
                .hasTriedColdTurkey
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />
          <FormResponse
            label="Nicotine Patch"
            value={
              programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
                .hasUsedNicotinePatch
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />
          <FormResponse
            label="Gum"
            value={
              programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
                .hasUsedGum
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />
          <FormResponse
            label="Hypnosis"
            value={
              programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
                .hasUsedHypnosis
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />
          <FormResponse
            label="e-Cigarettes"
            value={
              programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
                .hasUsedECigarettes
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />
          <FormResponse
            label="Other"
            value={
              programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
                .hasUsedOther
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />
          <FormResponse
            label="I Have Not Tried to Quit"
            value={
              programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
                .hasNotTriedToQuit
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />
        </Box>

        <FormResponse
          label="First Cigarette Time"
          value={
            programSpecificQuestionsSection.rigsWithoutCigs.firstCigaretteTime
          }
        />
        <FormResponse
          label="Does Find It Difficult to Not Smoke in Non-Smoking Areas"
          value={
            programSpecificQuestionsSection.rigsWithoutCigs
              .doesFindItDifficultToNotSmokeInNonSmokingAreas
              ? "Yes"
              : "No"
          }
        />
        <FormResponse
          label="Hardest Cigarette to Give Up"
          value={
            programSpecificQuestionsSection.rigsWithoutCigs
              .hardestCigaretteToGiveUp
          }
        />
        <FormResponse
          label="Cigarettes Per Day"
          value={programSpecificQuestionsSection.rigsWithoutCigs.cigarettesPerDay.toString()}
        />
        <FormResponse
          label="Smokes More Often in the Morning"
          value={
            programSpecificQuestionsSection.rigsWithoutCigs
              .smokesMoreOftenInTheMorning
              ? "Yes"
              : "No"
          }
        />
        <FormResponse
          label="Smokes Even When Sick in Bed"
          value={
            programSpecificQuestionsSection.rigsWithoutCigs
              .smokesEvenWhenSickInBed
              ? "Yes"
              : "No"
          }
        />
        <FormResponse
          label="Plans to Join Facebook Group"
          value={
            programSpecificQuestionsSection.rigsWithoutCigs
              .plansToJoinFacebookGroup
              ? "Yes"
              : "No"
          }
        />
        <FormResponse
          label="Reason for Quitting Smoking"
          value={
            programSpecificQuestionsSection.rigsWithoutCigs
              .whyDoYouWantToQuitSmoking
          }
        />
        <FormResponse
          label="How to Help"
          value={
            programSpecificQuestionsSection.rigsWithoutCigs.howCanWeHelpYou
          }
        />
      </Box>
    </Box>
  );
}
