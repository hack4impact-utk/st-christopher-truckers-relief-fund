import {
  GeneralInformationSection,
  ProgramSelectionSection,
  ProgramSpecificQuestionsSection,
  QualifyingQuestionsSection,
} from ".";

export type EnrollmentForm = {
  _id?: string;
  dateSubmitted: string;
  generalInformationSection: GeneralInformationSection;
  qualifyingQuestionsSection: QualifyingQuestionsSection;
  programSelectionSection: ProgramSelectionSection;
  programSpecificQuestionsSection: ProgramSpecificQuestionsSection;
};
