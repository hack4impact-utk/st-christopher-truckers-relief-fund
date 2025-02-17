"use client";
import { createContext, ReactNode, useEffect, useState } from "react";

import { EnrollmentForm } from "@/types/EnrollmentForm";
import { GeneralInformationSection } from "@/types/EnrollmentForm/GeneralInformationSection";
import { ProgramSelectionSection } from "@/types/EnrollmentForm/ProgramSelectionSection";
import { ProgramSpecificQuestionsSection } from "@/types/EnrollmentForm/ProgramSpecificQuestionsSection";
import { QualifyingQuestionsSection } from "@/types/EnrollmentForm/QualifyingQuestionsSection";
import calculateBmi from "@/utils/calculateBmi";
import calculateCigaretteFagerstormScore from "@/utils/calculateCigaretteFagerstormScore";
import calculateTobaccoFagerstormScore from "@/utils/calculateTobaccoFagerstormScore";
import {
  generalInformationSectionDefaultValues,
  programSelectionSectionDefaultValues,
  programSpecificQuestionsSectionDefaultValues,
  qualifyingQuestionsSectionDefaultValues,
} from "@/utils/constants/formDefaultValues";
import dayjsUtil from "@/utils/dayjsUtil";

export type EnrollmentFormContextType = {
  enrollmentForm: EnrollmentForm;
  completedSections: {
    generalInformationSectionCompleted: boolean;
    programSelectionSectionCompleted: boolean;
    qualifyingQuestionsSectionCompleted: boolean;
    programSpecificQuestionsSectionCompleted: boolean;
  };
  updateGeneralInformationSection: (section: GeneralInformationSection) => void;
  updateQualifyingQuestionsSection: (
    section: QualifyingQuestionsSection,
  ) => void;
  updateProgramSelectionSection: (section: ProgramSelectionSection) => void;
  updateProgramSpecificQuestionsSection: (
    section: ProgramSpecificQuestionsSection,
  ) => void;
  resetEnrollmentForm: () => void;
};

export const EnrollmentFormContext =
  createContext<EnrollmentFormContextType | null>(null);

type EnrollmentFormProviderProps = {
  children: React.ReactNode;
};

export function EnrollmentFormProvider({
  children,
}: EnrollmentFormProviderProps): ReactNode {
  const [enrollmentForm, setEnrollmentForm] = useState<EnrollmentForm>({
    dateSubmitted: dayjsUtil().utc().toISOString(),
    generalInformationSection: generalInformationSectionDefaultValues,
    programSelectionSection: programSelectionSectionDefaultValues,
    qualifyingQuestionsSection: qualifyingQuestionsSectionDefaultValues,
    programSpecificQuestionsSection:
      programSpecificQuestionsSectionDefaultValues,
  });

  const [completedSections, setCompletedSections] = useState({
    generalInformationSectionCompleted: false,
    programSelectionSectionCompleted: false,
    qualifyingQuestionsSectionCompleted: false,
    programSpecificQuestionsSectionCompleted: false,
  });

  const updateGeneralInformationSection = (
    section: GeneralInformationSection,
  ): void => {
    setEnrollmentForm((prevForm) => ({
      ...prevForm,
      generalInformationSection: section,
    }));
    setCompletedSections((prevCompletedSections) => ({
      ...prevCompletedSections,
      generalInformationSectionCompleted: true,
    }));
  };

  const updateQualifyingQuestionsSection = (
    section: QualifyingQuestionsSection,
  ): void => {
    setEnrollmentForm((prevForm) => ({
      ...prevForm,
      qualifyingQuestionsSection: section,
    }));
    setCompletedSections((prevCompletedSections) => ({
      ...prevCompletedSections,
      qualifyingQuestionsSectionCompleted: true,
    }));
  };

  const updateProgramSelectionSection = (
    section: ProgramSelectionSection,
  ): void => {
    setEnrollmentForm((prevForm) => ({
      ...prevForm,
      programSelectionSection: section,
      programSpecificQuestionsSection: {
        ...prevForm.programSpecificQuestionsSection,
        hasOptedInToHealthyHabits: section.optedInToHealthyHabits,
        hasOptedInToDiabetesPrevention: section.optedInToDiabetesPrevention,
        hasOptedInToRigsWithoutCigs: section.optedInToRigsWithoutCigs,
        hasOptedInToVaccineVoucher: section.optedInToVaccineVoucher,
        hasOptedInToGetPreventativeScreenings:
          section.optedInToGetPreventativeScreenings,
      },
    }));
    setCompletedSections((prevCompletedSections) => ({
      ...prevCompletedSections,
      programSelectionSectionCompleted: true,
    }));
  };

  const updateProgramSpecificQuestionsSection = (
    section: ProgramSpecificQuestionsSection,
  ): void => {
    setEnrollmentForm((prevForm) => ({
      ...prevForm,
      dateSubmitted: dayjsUtil().utc().toISOString(),
      programSpecificQuestionsSection: {
        ...section,
        healthyHabitsAndDiabetesPrevention: {
          ...section.healthyHabitsAndDiabetesPrevention,
          bmi: calculateBmi(
            section.healthyHabitsAndDiabetesPrevention.heightFeet,
            section.healthyHabitsAndDiabetesPrevention.heightInches,
            section.healthyHabitsAndDiabetesPrevention.weight,
          ),
        },
        rigsWithoutCigs: {
          ...section.rigsWithoutCigs,
          tobaccoFagerstormScore: calculateTobaccoFagerstormScore(
            section.rigsWithoutCigs.firstTobaccoTime,
            section.rigsWithoutCigs.swallowTobaccoJuice,
            section.rigsWithoutCigs.tobaccoHateToGiveUp,
            section.rigsWithoutCigs.tobaccoCansPerWeek,
            section.rigsWithoutCigs.tobaccoChewMoreAfterAwakening,
            section.rigsWithoutCigs.tobaccoChewWhenIll,
          ),
          cigaretteFagerstormScore: calculateCigaretteFagerstormScore(
            section.rigsWithoutCigs.firstSmokeTime,
            section.rigsWithoutCigs.isDifficultToNotSmokeInForbiddenAreas,
            section.rigsWithoutCigs.cigaretteHateToGiveUp,
            section.rigsWithoutCigs.cigarettesPerDay,
            section.rigsWithoutCigs.smokeMoreInMorning,
            section.rigsWithoutCigs.smokeWhenIll,
          ),
        },
      },
    }));
    setCompletedSections((prevCompletedSections) => ({
      ...prevCompletedSections,
      programSpecificQuestionsSectionCompleted: true,
    }));
  };

  const resetEnrollmentForm = (): void => {
    setEnrollmentForm({
      dateSubmitted: dayjsUtil().utc().toISOString(),
      generalInformationSection: generalInformationSectionDefaultValues,
      qualifyingQuestionsSection: qualifyingQuestionsSectionDefaultValues,
      programSelectionSection: programSelectionSectionDefaultValues,
      programSpecificQuestionsSection:
        programSpecificQuestionsSectionDefaultValues,
    });

    setCompletedSections({
      generalInformationSectionCompleted: false,
      programSelectionSectionCompleted: false,
      qualifyingQuestionsSectionCompleted: false,
      programSpecificQuestionsSectionCompleted: false,
    });
  };

  // show warning on window unload
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent): string => {
      if (event.preventDefault) {
        event.preventDefault();
      }

      return "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return (): void => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <EnrollmentFormContext.Provider
      value={{
        enrollmentForm,
        completedSections,
        updateGeneralInformationSection,
        updateQualifyingQuestionsSection,
        updateProgramSelectionSection,
        updateProgramSpecificQuestionsSection,
        resetEnrollmentForm,
      }}
    >
      {children}
    </EnrollmentFormContext.Provider>
  );
}
