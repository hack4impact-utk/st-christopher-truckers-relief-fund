import mongoose, { Schema } from "mongoose";

import { EnrollmentForm } from "@/types";

const EnrollmentFormSchema = new Schema<EnrollmentForm>(
  {
    dateSubmitted: {
      type: String,
      required: true,
    },
    generalInformationSection: {
      firstName: String,
      lastName: String,
      email: String,
      dateOfBirth: String,
      sex: String,
      phoneNumber: String,
      address: String,
      preferredMethodOfContact: String,
      isUsCitizen: Boolean,
      hasClassACdl: Boolean,
      cdlNumber: String,
      truckingIndustryAffiliation: String,
      jobDescription: String,
      referralSource: String,
      employer: {
        name: String,
        contact: String,
      },
      doctors: Array,
      monthlyHouseholdExpenses: Number,
      isOwnerOperator: Boolean,
      ownerOperatorInfo: {
        businessIncome: Number,
        businessExpenses: Number,
      },
      hasAcknowledgedPrivacyNotice: Boolean,
      hasAcknowledgedHipaaNotice: Boolean,
    },
    qualifyingQuestionsSection: {
      diagnoses: {
        hasType1Diabetes: Boolean,
        hasType2Diabetes: Boolean,
        hasHighBloodPressure: Boolean,
        hasHighCholesterol: Boolean,
        hasHeartDisease: Boolean,
        isObese: Boolean,
        hasOther: String,
        noneOfTheAbove: Boolean,
      },
      isTobaccoUser: Boolean,
      hasAppliedForFinancialAssistance: Boolean,
      hasHealthConditionCausedByTobaccoUse: Boolean,
      hasHealthInsurance: Boolean,
      hasCloseFamilyHistoryOfProstateCancer: Boolean,
    },
    programSelectionSection: {
      optedInToHealthyHabits: Boolean,
      optedInToDiabetesPrevention: Boolean,
      optedInToRigsWithoutCigs: Boolean,
      optedInToVaccineVoucher: Boolean,
      optedInToGetPreventativeScreenings: Boolean,
    },
    programSpecificQuestionsSection: {
      hasOptedInToHealthyHabits: Boolean,
      hasOptedInToDiabetesPrevention: Boolean,
      hasOptedInToRigsWithoutCigs: Boolean,
      hasOptedInToVaccineVoucher: Boolean,
      hasOptedInToGetPreventativeScreenings: Boolean,
      healthyHabitsAndDiabetesPrevention: {
        weight: Number,
        heightFeet: Number,
        heightInches: Number,
        bmi: Number,
        hasHadGlucoseOrA1CTestInPastYear: Boolean,
        glucoseOrA1CTestResult: String,
        systolicBloodPressure: Number,
        diastolicBloodPressure: Number,
        movementAndActivityRanking: String,
        energyRanking: String,
        sleepRanking: String,
        emotionalHealthRanking: String,
        waterBottlesPerDay: String,
        fruitAndVegetableServingsPerDay: String,
        otherIllnessOrInjury: String,
        biggestHealthyLivingChallenge: String,
        shortTermHealthGoals: String,
        longTermHealthGoals: String,
        devices: {
          hasScale: Boolean,
          hasBloodPressureCuff: Boolean,
          hasGlucoseMonitor: Boolean,
          hasA1cHomeTest: Boolean,
          hasFitnessTracker: Boolean,
          hasBodyTapeMeasure: Boolean,
          hasResistanceBands: Boolean,
          hasOtherExerciseEquipment: Boolean,
          noneOfTheAbove: Boolean,
        },
        healthyHabitsHopefulLearnings: String,
        diabetesPreventionHopefulLearnings: String,
      },
      rigsWithoutCigs: {
        tobaccoForm: {
          doesUseCigarettes: Boolean,
          doesUseSmokelessTobacco: Boolean,
        },
        tobaccoUsageLength: String,
        isFirstTimeTryingToQuit: Boolean,
        methodsUsedToQuit: {
          hasNotTriedToQuit: Boolean,
          hasTriedColdTurkey: Boolean,
          hasUsedAudiobook: Boolean,
          hasUsedChantix: Boolean,
          hasUsedColdTurkey: Boolean,
          hasUsedECigarettes: Boolean,
          hasUsedGrindsCoffeePouches: Boolean,
          hasUsedGum: Boolean,
          hasUsedHypnosis: Boolean,
          hasUsedLozenges: Boolean,
          hasUsedMedication: Boolean,
          hasUsedMobileApp: Boolean,
          hasUsedNicotinePatch: Boolean,
          hasUsedOther: Boolean,
          hasUsedTaperMethod: Boolean,
          hasUsedVarenicline: Boolean,
          hasUsedWellbutrin: Boolean,
        },
        firstTobaccoTime: String,
        swallowTobaccoJuice: String,
        tobaccoHateToGiveUp: String,
        tobaccoCansPerWeek: String,
        tobaccoChewMoreAfterAwakening: String,
        tobaccoChewWhenIll: String,
        tobaccoFagerstormScore: Number,
        firstSmokeTime: String,
        isDifficultToNotSmokeInForbiddenAreas: Boolean,
        cigaretteHateToGiveUp: String,
        cigarettesPerDay: String,
        smokeMoreInMorning: Boolean,
        smokeWhenIll: Boolean,
        cigaretteFagerstormScore: Number,
        plansToJoinFacebookGroup: Boolean,
        whyDoYouWantToQuitSmoking: String,
        howCanWeHelpYou: String,
        referralSource: String,
        accountabilityPerson: {
          firstName: String,
          lastName: String,
          phoneNumber: String,
          relationshipToAccountabilityPerson: String,
        },
        currentlyHasPrimaryCarePhysician: Boolean,
      },
      vaccineVoucher: {
        vaccines: {
          wantsFluVaccine: Boolean,
          wantsPneumoniaVaccine: Boolean,
          wantsShinglesVaccine: Boolean,
          wantsCovid19Vaccine: Boolean,
        },
        voucherLocation: String,
        additionalQuestions: String,
      },
      getPreventativeScreenings: {
        agreeToShareResults: Boolean,
        prostateScreening: {
          agreeToGetAccountRegistered: Boolean,
          agreesToProstateScreening: Boolean,
          isNotApplicable: Boolean,
          additionalQuestions: String,
        },
      },
    },
  },
  { versionKey: false },
);

export default (mongoose.models
  .EnrollmentForm as mongoose.Model<EnrollmentForm>) ||
  mongoose.model<EnrollmentForm>("EnrollmentForm", EnrollmentFormSchema);
