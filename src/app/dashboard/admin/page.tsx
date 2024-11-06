import { Box } from "@mui/material";
import { redirect } from "next/navigation";

import PendingApplicationDashboard from "@/components/Dashboard/PendingApplicationsDashboard";
import { EnrollmentForm, ProgramEnrollment } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";
import getUserSession from "@/utils/getUserSession";

export default async function AdminDashboardPage() {
  const testProgramEnrollmentForm1: EnrollmentForm = {
    _id: crypto.randomUUID(),
    dateCreated: "2024-11-06T10:00:00Z",
    hasAcknowledgedPrivacyNotice: true,
    hasAcknowledgedHipaaNotice: true,
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    password: "securepassword123",
    confirmPassword: "securepassword123",
    address: "1234 Elm Street, Springfield, IL 62701",
    phoneNumber: "+1 (555) 123-4567",
    hasClassACdl: true,
    cdlNumber: "A1234567890", // Required because hasClassACdl is true
    classBDescription: "", // Optional because hasClassACdl is true
    dateOfBirth: "1980-05-15", // A valid date
    healthConditions: "None",
    recentIllnessOrInjuryDetails: "None",
    drivesSemiTruckOverRoad: true,
    isUsCitizen: true,
    referralSource: "Online Ad",
    doctors: [
      {
        name: "Dr. Sarah Smith",
        phone: "+1 (555) 987-6543",
        id: "doc123",
      },
    ],
    employer: {
      name: "ABC Logistics",
      contact: "recruiter@abclogistics.com",
    },
    monthlyHouseholdExpenses: 2500,
    isOwnerOperator: false,
    ownerOperatorInfo: undefined,
    healthMetrics: {
      isDiabetic: false,
      hasHighBloodPressure: false,
      hasHighCholesterol: false,
      hasHeartDisease: false,
      isObese: false,
      a1c: undefined,
      bloodGlucose: undefined,
      cholesterol: undefined,
      weight: 180,
      bloodPressure: "120/80",
      other: undefined,
    },
    healthGoals: {
      shortTerm: "Lose 10 lbs in 3 months",
      longTerm: "Maintain a healthy weight and reduce stress",
    },
    devices: "Scale, Glucose Monitor",
  };

  const testProgramEnrollmentForm2: EnrollmentForm = {
    _id: crypto.randomUUID(),
    dateCreated: "2024-11-06T11:30:00Z",
    hasAcknowledgedPrivacyNotice: true,
    hasAcknowledgedHipaaNotice: true,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    password: "alicepassword321",
    confirmPassword: "alicepassword321",
    address: "5678 Oak Avenue, Seattle, WA 98101",
    phoneNumber: "+1 (555) 234-5678",
    hasClassACdl: false,
    cdlNumber: "", // Not required because hasClassACdl is false
    classBDescription: "Class B CDL for local deliveries", // Provided because hasClassACdl is false
    dateOfBirth: "1992-08-30", // A valid date
    healthConditions: "Asthma",
    recentIllnessOrInjuryDetails:
      "Recovered from a mild cold in the past month",
    drivesSemiTruckOverRoad: false,
    isUsCitizen: true,
    referralSource: "Friend Referral",
    doctors: [
      {
        name: "Dr. Emily Parker",
        phone: "+1 (555) 876-5432",
        id: "doc456",
      },
    ],
    employer: {
      name: "Greenway Transport",
      contact: "hr@greenwaytransport.com",
    },
    monthlyHouseholdExpenses: 3200,
    isOwnerOperator: true,
    ownerOperatorInfo: {
      businessIncome: 5000,
      businessExpenses: 2000,
    },
    healthMetrics: {
      isDiabetic: false,
      hasHighBloodPressure: true,
      hasHighCholesterol: false,
      hasHeartDisease: false,
      isObese: true,
      a1c: 6.1,
      bloodGlucose: 110,
      cholesterol: 210,
      weight: 250,
      bloodPressure: "135/90",
      other: "Sleep Apnea",
    },
    healthGoals: {
      shortTerm: "Reduce blood pressure and lose 15 lbs in 6 months",
      longTerm: "Improve cardiovascular health and sleep quality",
    },
    devices: "Blood Pressure Monitor, Sleep Apnea Machine",
  };

  const testProgramEnrollmentForm3: EnrollmentForm = {
    _id: crypto.randomUUID(),
    dateCreated: "2024-11-06T13:00:00Z",
    hasAcknowledgedPrivacyNotice: true,
    hasAcknowledgedHipaaNotice: true,
    firstName: "Mark",
    lastName: "Williams",
    email: "mark.williams@example.com",
    password: "passwordMark123",
    confirmPassword: "passwordMark123",
    address: "9876 Pine Road, Dallas, TX 75201",
    phoneNumber: "+1 (555) 345-6789",
    hasClassACdl: true,
    cdlNumber: "A9876543210", // Required because hasClassACdl is true
    classBDescription: "", // Optional because hasClassACdl is true
    dateOfBirth: "1975-11-20", // A valid date
    healthConditions: "None",
    recentIllnessOrInjuryDetails: "None",
    drivesSemiTruckOverRoad: true,
    isUsCitizen: true,
    referralSource: "Social Media",
    doctors: [
      {
        name: "Dr. James Turner",
        phone: "+1 (555) 543-2109",
        id: "doc789",
      },
    ],
    employer: {
      name: "Star Freight Co.",
      contact: "hr@starfreight.com",
    },
    monthlyHouseholdExpenses: 4000,
    isOwnerOperator: false,
    ownerOperatorInfo: undefined,
    healthMetrics: {
      isDiabetic: false,
      hasHighBloodPressure: false,
      hasHighCholesterol: false,
      hasHeartDisease: false,
      isObese: false,
      a1c: undefined,
      bloodGlucose: undefined,
      cholesterol: undefined,
      weight: 210,
      bloodPressure: "122/78",
      other: undefined,
    },
    healthGoals: {
      shortTerm: "Maintain weight and stay active",
      longTerm: "Continue healthy lifestyle with regular exercise",
    },
    devices: "Fitness Tracker",
  };

  const testProgramEnrollmentForm4: EnrollmentForm = {
    _id: crypto.randomUUID(),
    dateCreated: "2024-11-06T14:30:00Z",
    hasAcknowledgedPrivacyNotice: true,
    hasAcknowledgedHipaaNotice: true,
    firstName: "Sophia",
    lastName: "Brown",
    email: "sophia.brown@example.com",
    password: "sophiapassword987",
    confirmPassword: "sophiapassword987",
    address: "1357 Birch Street, Miami, FL 33101",
    phoneNumber: "+1 (555) 456-7890",
    hasClassACdl: false,
    cdlNumber: "", // Not required because hasClassACdl is false
    classBDescription: "Class B CDL for regional transport", // Provided because hasClassACdl is false
    dateOfBirth: "1988-03-10", // A valid date
    healthConditions: "Hypertension",
    recentIllnessOrInjuryDetails: "Recently recovered from knee surgery",
    drivesSemiTruckOverRoad: false,
    isUsCitizen: true,
    referralSource: "Family",
    doctors: [
      {
        name: "Dr. Lisa Green",
        phone: "+1 (555) 654-3210",
        id: "doc321",
      },
    ],
    employer: {
      name: "FastWay Logistics",
      contact: "careers@fastwaylogistics.com",
    },
    monthlyHouseholdExpenses: 2700,
    isOwnerOperator: false,
    ownerOperatorInfo: undefined,
    healthMetrics: {
      isDiabetic: false,
      hasHighBloodPressure: true,
      hasHighCholesterol: true,
      hasHeartDisease: false,
      isObese: false,
      a1c: 5.7,
      bloodGlucose: 95,
      cholesterol: 220,
      weight: 200,
      bloodPressure: "145/90",
      other: "Chronic Back Pain",
    },
    healthGoals: {
      shortTerm: "Lower blood pressure and cholesterol",
      longTerm: "Improve joint mobility and manage weight",
    },
    devices: "Blood Pressure Monitor, Fitness Tracker",
  };

  const testProgramEnrollmentForm5: EnrollmentForm = {
    _id: crypto.randomUUID(),
    dateCreated: "2024-11-06T16:00:00Z",
    hasAcknowledgedPrivacyNotice: true,
    hasAcknowledgedHipaaNotice: true,
    firstName: "Michael",
    lastName: "Davis",
    email: "michael.davis@example.com",
    password: "mikepassword456",
    confirmPassword: "mikepassword456",
    address: "2468 Maple Circle, Boston, MA 02101",
    phoneNumber: "+1 (555) 567-8901",
    hasClassACdl: true,
    cdlNumber: "A1122334455", // Required because hasClassACdl is true
    classBDescription: "", // Optional because hasClassACdl is true
    dateOfBirth: "1990-07-25", // A valid date
    healthConditions: "None",
    recentIllnessOrInjuryDetails: "None",
    drivesSemiTruckOverRoad: true,
    isUsCitizen: true,
    referralSource: "Workplace",
    doctors: [
      {
        name: "Dr. John Miller",
        phone: "+1 (555) 765-4321",
        id: "doc654",
      },
    ],
    employer: {
      name: "Omega Freight",
      contact: "jobs@omegafreight.com",
    },
    monthlyHouseholdExpenses: 3500,
    isOwnerOperator: false,
    ownerOperatorInfo: undefined,
    healthMetrics: {
      isDiabetic: false,
      hasHighBloodPressure: false,
      hasHighCholesterol: false,
      hasHeartDisease: false,
      isObese: false,
      a1c: undefined,
      bloodGlucose: undefined,
      cholesterol: undefined,
      weight: 190,
      bloodPressure: "118/76",
      other: undefined,
    },
    healthGoals: {
      shortTerm: "Maintain active lifestyle and healthy diet",
      longTerm: "Continue to stay in good shape with consistent exercise",
    },
    devices: "Fitness Tracker",
  };

  const testProgramEnrollment1: ProgramEnrollment = {
    _id: crypto.randomUUID(),
    status: "pending",
    program: "Healthy Habits For The Long Haul",
    email: "julia.greenfield92@example.com",
    enrollmentForm: testProgramEnrollmentForm1,
    dateEnrolled: dayjsUtil().utc().toISOString(),
  };

  const testProgramEnrollment2: ProgramEnrollment = {
    _id: crypto.randomUUID(),
    status: "pending",
    program: "Diabetes Prevention",
    email: "mike.smithson21@example.com",
    enrollmentForm: testProgramEnrollmentForm2,
    dateEnrolled: dayjsUtil().utc().toISOString(),
  };

  const testProgramEnrollment3: ProgramEnrollment = {
    _id: crypto.randomUUID(),
    status: "pending",
    program: "Diabetes Prevention",
    email: "emily.brownstone7@example.com",
    enrollmentForm: testProgramEnrollmentForm3,
    dateEnrolled: dayjsUtil().utc().toISOString(),
  };

  const testProgramEnrollment4: ProgramEnrollment = {
    _id: crypto.randomUUID(),
    status: "pending",
    program: "Rigs Without Cigs",
    email: "david.roberts64@example.com",
    enrollmentForm: testProgramEnrollmentForm4,
    dateEnrolled: dayjsUtil().utc().toISOString(),
  };

  const testProgramEnrollment5: ProgramEnrollment = {
    _id: crypto.randomUUID(),
    status: "pending",
    program: "Vaccine Voucher",
    email: "laura.jameson45@example.com",
    enrollmentForm: testProgramEnrollmentForm5,
    dateEnrolled: dayjsUtil().utc().toISOString(),
  };

  const test: ProgramEnrollment[] = [
    testProgramEnrollment1,
    testProgramEnrollment2,
    testProgramEnrollment3,
    testProgramEnrollment4,
    testProgramEnrollment5,
  ];

  const session = await getUserSession();

  if (!session || session.user.role !== "admin") {
    return redirect("/dashboard");
  }

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PendingApplicationDashboard programEnrollments={test} />
    </Box>
  );
}
