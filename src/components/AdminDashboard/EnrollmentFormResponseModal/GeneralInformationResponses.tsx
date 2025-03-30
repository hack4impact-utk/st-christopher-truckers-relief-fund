import { Box } from "@mui/material";
import { ReactNode } from "react";

import FormResponse from "@/components/SCFModal/FormResponse";
import FormSection from "@/components/SCFModal/FormSection";
import FormSubsection from "@/components/SCFModal/FormSubsection";
import { GeneralInformationSection } from "@/types/EnrollmentForm";

type GeneralInformationResponsesProps = {
  generalInformationSection: GeneralInformationSection;
};

type GeneralInformationSectionResponse = {
  label: string;
  value: string | number;
  showFormResponse?: boolean;
  isListItem?: boolean;
};

export default function GeneralInformationResponses({
  generalInformationSection,
}: Readonly<GeneralInformationResponsesProps>): ReactNode {
  const generalInformationSectionResponses: GeneralInformationSectionResponse[] =
    [
      {
        label: "First Name",
        value: generalInformationSection.firstName,
      },
      {
        label: "Last Name",
        value: generalInformationSection.lastName,
      },
      {
        label: "Email",
        value: generalInformationSection.email,
      },
      {
        label: "Phone Number",
        value: generalInformationSection.phoneNumber,
      },
      {
        label: "Date of Birth",
        value: generalInformationSection.dateOfBirth,
      },
      {
        label: "Sex",
        value: generalInformationSection.sex,
      },
      {
        label: "Address",
        value: generalInformationSection.address,
      },
      {
        label: "Preferred Method of Contact",
        value: generalInformationSection.preferredMethodOfContact,
      },
      {
        label: "U.S. Citizen",
        value: generalInformationSection.isUsCitizen ? "Yes" : "No",
      },
      {
        label: "Class A CDL",
        value: generalInformationSection.hasClassACdl ? "Yes" : "No",
      },
      {
        label: "CDL Number",
        value: generalInformationSection.cdlNumber ?? "Not Provided",
        showFormResponse: !!generalInformationSection.hasClassACdl,
      },
      {
        label: "Trucking Industry Affiliation",
        value: generalInformationSection.truckingIndustryAffiliation,
      },
      {
        label: "Job Description",
        value: generalInformationSection.jobDescription,
      },
      {
        label: "Referral Source",
        value: generalInformationSection.referralSource,
      },
      {
        label: "Employer Name",
        value: generalInformationSection.employer.name ?? "Not Provided",
        showFormResponse: !!generalInformationSection.employer.name,
      },
      {
        label: "Employer Contact",
        value: generalInformationSection.employer.contact ?? "Not Provided",
        showFormResponse: !!generalInformationSection.employer.contact,
      },
      {
        label: "Monthly Household Expenses",
        value: `$${generalInformationSection.monthlyHouseholdExpenses}`,
      },
      {
        label: "Is A Owner Or Operator",
        value: generalInformationSection.isOwnerOperator ? "Yes" : "No",
      },
      {
        label: "Business Income",
        value: generalInformationSection.ownerOperatorInfo.businessIncome
          ? `$${generalInformationSection.ownerOperatorInfo.businessIncome}`
          : "Not Provided",
        showFormResponse: !!generalInformationSection.isOwnerOperator,
        isListItem: true,
      },
      {
        label: "Business Expenses",
        value: generalInformationSection.ownerOperatorInfo.businessExpenses
          ? `$${generalInformationSection.ownerOperatorInfo.businessExpenses}`
          : "Not Provided",
        showFormResponse: !!generalInformationSection.isOwnerOperator,
        isListItem: true,
      },
    ];

  return (
    <Box>
      <FormSection title="General Information">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {generalInformationSectionResponses.map((response) => (
            <FormResponse
              key={response.label}
              label={response.label}
              value={response.value}
              showFormResponse={response.showFormResponse}
              isListItem={response.isListItem}
            />
          ))}

          <FormResponse
            label="Acknowledged HIPAA Notice"
            value={
              generalInformationSection.hasAcknowledgedHipaaNotice
                ? "Yes"
                : "No"
            }
          />

          <FormSubsection title="Doctors">
            {generalInformationSection.doctors.map((doctor) => (
              <Box
                key={doctor.id}
                display="flex"
                flexDirection="column"
                gap={1}
              >
                <FormResponse
                  label="Name"
                  value={doctor.name}
                  isListItem={true}
                />
                <FormResponse
                  label="Phone"
                  value={doctor.phone}
                  isListItem={true}
                />
              </Box>
            ))}
          </FormSubsection>
        </Box>
      </FormSection>
    </Box>
  );
}
