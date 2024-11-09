import { GeneralInformationSection } from "@/types/EnrollmentForm/GeneralInformationSection";
import { ProgramSelectionSection } from "@/types/EnrollmentForm/ProgramSelectionSection";
import { ProgramSpecificQuestionsSection } from "@/types/EnrollmentForm/ProgramSpecificQuestionsSection";
import { QualifyingQuestionsSection } from "@/types/EnrollmentForm/QualifyingQuestionsSection";

export type EnrollmentForm = {
  _id?: string;
  dateSubmitted: string;
  generalInformationSection: GeneralInformationSection;
  qualifyingQuestionsSection: QualifyingQuestionsSection;
  programSelectionSection: ProgramSelectionSection;
  programSpecificQuestionsSection: ProgramSpecificQuestionsSection;
};
