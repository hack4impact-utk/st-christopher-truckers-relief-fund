import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { ProgramSpecificQuestionsSection } from "@/types";

import FormResponse from "../FormResponse";

type RigsWithoutCigsResponsesProps = {
  programSpecificQuestionsSection: ProgramSpecificQuestionsSection;
};

export default function RigsWithoutCigsResponses({
  programSpecificQuestionsSection,
}: RigsWithoutCigsResponsesProps): ReactNode {
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

        {programSpecificQuestionsSection.rigsWithoutCigs.tobaccoForm
          .doesUseCigarettes && (
          <>
            <FormResponse
              label="Cigarette Fagerstrom Test"
              value={
                programSpecificQuestionsSection.rigsWithoutCigs
                  .cigaretteFagerstromScore
              }
            />
            <FormResponse
              label="First Smoke Time"
              value={
                programSpecificQuestionsSection.rigsWithoutCigs.firstSmokeTime
              }
              isListItem={true}
            />
            <FormResponse
              label="Is Difficult to Not Smoke in Forbidden Areas"
              value={
                programSpecificQuestionsSection.rigsWithoutCigs
                  .isDifficultToNotSmokeInForbiddenAreas
                  ? "Yes"
                  : "No"
              }
              isListItem={true}
            />
            <FormResponse
              label="Cigarette Hate to Give Up"
              value={
                programSpecificQuestionsSection.rigsWithoutCigs
                  .cigaretteHateToGiveUp
              }
              isListItem={true}
            />
            <FormResponse
              label="Cigarettes Per Day"
              value={
                programSpecificQuestionsSection.rigsWithoutCigs.cigarettesPerDay
              }
              isListItem={true}
            />
            <FormResponse
              label="Smoke More in Morning"
              value={
                programSpecificQuestionsSection.rigsWithoutCigs
                  .smokeMoreInMorning
                  ? "Yes"
                  : "No"
              }
              isListItem={true}
            />
            <FormResponse
              label="Smoke When Ill"
              value={
                programSpecificQuestionsSection.rigsWithoutCigs.smokeWhenIll
                  ? "Yes"
                  : "No"
              }
              isListItem={true}
            />
          </>
        )}

        {programSpecificQuestionsSection.rigsWithoutCigs.tobaccoForm
          .doesUseSmokelessTobacco && (
          <>
            <FormResponse
              label="Smokeless Tobacco Fagerstrom Test"
              value={
                programSpecificQuestionsSection.rigsWithoutCigs
                  .tobaccoFagerstromScore
              }
            />
            <FormResponse
              label="First Tobacco Time"
              value={
                programSpecificQuestionsSection.rigsWithoutCigs.firstTobaccoTime
              }
              isListItem={true}
            />
            <FormResponse
              label="Swallow Tobacco Juice"
              value={
                programSpecificQuestionsSection.rigsWithoutCigs
                  .swallowTobaccoJuice
              }
              isListItem={true}
            />
            <FormResponse
              label="Tobacco Hate to Give Up"
              value={
                programSpecificQuestionsSection.rigsWithoutCigs
                  .tobaccoHateToGiveUp
              }
              isListItem={true}
            />
            <FormResponse
              label="Tobacco Cans Per Week"
              value={
                programSpecificQuestionsSection.rigsWithoutCigs
                  .tobaccoCansPerWeek
              }
              isListItem={true}
            />
            <FormResponse
              label="Tobacco Chew More After Awakening"
              value={
                programSpecificQuestionsSection.rigsWithoutCigs
                  .tobaccoChewMoreAfterAwakening
                  ? "Yes"
                  : "No"
              }
              isListItem={true}
            />
            <FormResponse
              label="Tobacco Chew When Ill"
              value={
                programSpecificQuestionsSection.rigsWithoutCigs
                  .tobaccoChewWhenIll
                  ? "Yes"
                  : "No"
              }
              isListItem={true}
            />
          </>
        )}

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
            label="Not Tried To Quit"
            value={
              programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
                .hasNotTriedToQuit
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />

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
            label="Audiobook"
            value={
              programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
                .hasUsedAudiobook
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />

          <FormResponse
            label="Chantix"
            value={
              programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
                .hasUsedChantix
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />

          <FormResponse
            label="Cold Turkey"
            value={
              programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
                .hasUsedColdTurkey
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />

          <FormResponse
            label="E-Cigarettes"
            value={
              programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
                .hasUsedECigarettes
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />

          <FormResponse
            label="Grinds Coffee Pouches"
            value={
              programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
                .hasUsedGrindsCoffeePouches
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
            label="Lozenges"
            value={
              programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
                .hasUsedLozenges
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />

          <FormResponse
            label="Medication"
            value={
              programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
                .hasUsedMedication
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />

          <FormResponse
            label="Mobile App"
            value={
              programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
                .hasUsedMobileApp
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
            label="Taper Method"
            value={
              programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
                .hasUsedTaperMethod
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />

          <FormResponse
            label="Varenicline"
            value={
              programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
                .hasUsedVarenicline
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />

          <FormResponse
            label="Wellbutrin"
            value={
              programSpecificQuestionsSection.rigsWithoutCigs.methodsUsedToQuit
                .hasUsedWellbutrin
                ? "Yes"
                : "No"
            }
            isListItem={true}
          />
        </Box>

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
