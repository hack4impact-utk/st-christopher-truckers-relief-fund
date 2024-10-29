import InvitationInfoModal from "../components/InvitationInfoModal";
import { EnrollmentForm as EnrollmentFormType } from "@/types/EnrollmentForm";

import { Box, Button } from "@mui/material";
import Link from "next/link";

import LoginForm from "@/components/LoginForm";

export default function Home() {
  // Mock form
  const mockEnrollmentForm: EnrollmentFormType = {
    _id: "12345",
    dateCreated: "2024-10-22",
    hasAcknowledgedPrivacyNotice: true,
    hasAcknowledgedHipaaNotice: true,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "password123",
    confirmPassword: "password123",
    address: "123 Main St",
    phoneNumber: "555-555-5555",
    hasClassACdl: true,
    classBDescription: "N/A",
    dateOfBirth: "1990-01-01",
    healthConditions: "None",
    recentIllnessOrInjuryDetails: "N/A",
    drivesSemiTruckOverRoad: true,
    isUsCitizen: true,
    referralSource: "Friend",
    doctors: [],
    employer: {},
    monthlyHouseholdExpenses: 2000,
    ownerOperatorInfo: {},
    healthMetrics: {
      isDiabetic: false,
      hasHighBloodPressure: false,
      hasHighCholesterol: false,
      hasHeartDisease: false,
      isObese: false,
      weight: 180,
      a1c: 5.6,
      bloodGlucose: 90,
      cholesterol: 180,
      bloodPressure: "120/80",
      other: "N/A",
    },
    healthGoals: {
      shortTerm: "Maintain healthy weight",
      longTerm: "Reduce cholesterol levels",
    },
    devices: [],
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        gap: 2,
      }}
    >
      <LoginForm />

      <Link href="/enrollment-form" passHref>
        <Button variant="contained" color="primary">
          Fill out enrollment form
        </Button>
      </Link>

      <InvitationInfoModal enrollment_form={mockEnrollmentForm} />
    </Box>
  );
}
