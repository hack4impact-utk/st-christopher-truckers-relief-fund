"use client";
import { createContext, useEffect, useState } from "react";

import { EnrollmentForm } from "@/types/EnrollmentForm";
import { GeneralInformationSection } from "@/types/EnrollmentForm/GeneralInformationSection";
import { ProgramSelectionSection } from "@/types/EnrollmentForm/ProgramSelectionSection";
import { ProgramSpecificQuestionsSection } from "@/types/EnrollmentForm/ProgramSpecificQuestionsSection";
import { QualifyingQuestionsSection } from "@/types/EnrollmentForm/QualifyingQuestionsSection";
import {
  generalInformationSectionDefaultValues,
  programSelectionSectionDefaultValues,
  programSpecificQuestionsSectionDefaultValues,
  qualifyingQuestionsSectionDefaultValues,
} from "@/utils/constants/formDefaultValues";
import dayjsUtil from "@/utils/dayjsUtil";

type EnrollmentFormContextType = {
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
}: EnrollmentFormProviderProps) {
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
  ) => {
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
  ) => {
    setEnrollmentForm((prevForm) => ({
      ...prevForm,
      qualifyingQuestionsSection: section,
    }));
    setCompletedSections((prevCompletedSections) => ({
      ...prevCompletedSections,
      qualifyingQuestionsSectionCompleted: true,
    }));
  };

  const updateProgramSelectionSection = (section: ProgramSelectionSection) => {
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
  ) => {
    setEnrollmentForm((prevForm) => ({
      ...prevForm,
      dateSubmitted: dayjsUtil().utc().toISOString(),
      programSpecificQuestionsSection: section,
    }));
    setCompletedSections((prevCompletedSections) => ({
      ...prevCompletedSections,
      programSpecificQuestionsSectionCompleted: true,
    }));
  };

  const resetEnrollmentForm = () => {
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
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (event.preventDefault) {
        event.preventDefault();
      }

      return "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
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
