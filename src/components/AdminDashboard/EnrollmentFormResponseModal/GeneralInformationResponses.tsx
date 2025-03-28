import { Box } from "@mui/material";
import { ReactNode } from "react";

import FormResponse from "@/components/SCFModal/FormResponse";
import FormSection from "@/components/SCFModal/FormSection";
import FormSubsection from "@/components/SCFModal/FormSubsection";
import { GeneralInformationSection } from "@/types/EnrollmentForm";

type GeneralInformationResponsesProps = {
  generalInformationSection: GeneralInformationSection;
};

export default function GeneralInformationResponses({
  generalInformationSection,
}: Readonly<GeneralInformationResponsesProps>): ReactNode {
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
          <FormResponse
            label="First Name"
            value={generalInformationSection.firstName}
          />
          <FormResponse
            label="Last Name"
            value={generalInformationSection.lastName}
          />
          <FormResponse label="Email" value={generalInformationSection.email} />
          <FormResponse
            label="Phone Number"
            value={generalInformationSection.phoneNumber}
          />
          <FormResponse
            label="Date of Birth"
            value={generalInformationSection.dateOfBirth}
          />
          <FormResponse label="Sex" value={generalInformationSection.sex} />
          <FormResponse
            label="Address"
            value={generalInformationSection.address}
          />
          <FormResponse
            label="Preferred Method of Contact"
            value={generalInformationSection.preferredMethodOfContact}
          />
          <FormResponse
            label="U.S. Citizen"
            value={generalInformationSection.isUsCitizen ? "Yes" : "No"}
          />
          <FormResponse
            label="Class A CDL"
            value={generalInformationSection.hasClassACdl ? "Yes" : "No"}
          />
          {generalInformationSection.hasClassACdl && (
            <FormResponse
              label="CDL Number"
              value={generalInformationSection.cdlNumber ?? "Not Provided"}
            />
          )}
          <FormResponse
            label="Trucking Industry Affiliation"
            value={generalInformationSection.truckingIndustryAffiliation}
          />
          <FormResponse
            label="Job Description"
            value={generalInformationSection.jobDescription}
          />
          <FormResponse
            label="Referral Source"
            value={generalInformationSection.referralSource}
          />
          {generalInformationSection.employer.name && (
            <FormResponse
              label="Employer Name"
              value={generalInformationSection.employer.name}
            />
          )}
          {generalInformationSection.employer.contact && (
            <FormResponse
              label="Employer Contact"
              value={generalInformationSection.employer.contact}
            />
          )}

          <FormResponse
            label="Monthly Household Expenses"
            value={`$${generalInformationSection.monthlyHouseholdExpenses}`}
          />
          <FormResponse
            label="Is A Owner Or Operator"
            value={generalInformationSection.isOwnerOperator ? "Yes" : "No"}
          />
          {generalInformationSection.isOwnerOperator && (
            <Box display="flex" flexDirection="column" gap={1}>
              <FormResponse
                label="Business Income"
                value={
                  generalInformationSection.ownerOperatorInfo.businessIncome
                    ? `$${generalInformationSection.ownerOperatorInfo.businessIncome}`
                    : "Not Provided"
                }
                isListItem={true}
              />
              <FormResponse
                label="Business Expenses"
                value={
                  generalInformationSection.ownerOperatorInfo.businessExpenses
                    ? `$${generalInformationSection.ownerOperatorInfo.businessExpenses}`
                    : "Not Provided"
                }
                isListItem={true}
              />
            </Box>
          )}

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
