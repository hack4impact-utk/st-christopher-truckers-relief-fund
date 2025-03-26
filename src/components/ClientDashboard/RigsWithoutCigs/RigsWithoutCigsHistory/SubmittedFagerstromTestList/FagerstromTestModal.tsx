"use client";

import InfoIcon from "@mui/icons-material/Info";
import { Box } from "@mui/material";
import { ReactNode, useState } from "react";

import SCFModal from "@/components/SCFModal";
import FormResponse from "@/components/SCFModal/FormResponse";
import FormSection from "@/components/SCFModal/FormSection";
import { FagerstromTest } from "@/types/FagerstromTest";
import dayjsUtil from "@/utils/dayjsUtil";

type FagerstromTestModalProps = {
  fagerstromTest: FagerstromTest;
};

export default function FagerstromTestModal({
  fagerstromTest,
}: Readonly<FagerstromTestModalProps>): ReactNode {
  const [open, setOpen] = useState(false);

  const cigaretteResponses = [
    {
      label: "Fagerstrom Test Score",
      value: fagerstromTest.cigaretteFagerstromScore.toString(),
    },
    {
      label: "First Smoke Time",
      value: fagerstromTest.firstSmokeTime,
    },
    {
      label: "Is Difficult to Not Smoke in Forbidden Areas",
      value: fagerstromTest.isDifficultToNotSmokeInForbiddenAreas
        ? "Yes"
        : "No",
    },
    {
      label: "Cigarette Hate to Give Up",
      value: fagerstromTest.cigaretteHateToGiveUp,
    },
    {
      label: "Cigarettes Per Day",
      value: fagerstromTest.cigarettesPerDay,
    },
    {
      label: "Smoke More in Morning",
      value: fagerstromTest.smokeMoreInMorning ? "Yes" : "No",
    },
    {
      label: "Smoke When Ill",
      value: fagerstromTest.smokeWhenIll ? "Yes" : "No",
    },
  ];

  const tobaccoResponses = [
    {
      label: "Fagerstrom Test Score",
      value: fagerstromTest.tobaccoFagerstromScore.toString(),
    },
    {
      label: "First Tobacco Time",
      value: fagerstromTest.firstTobaccoTime,
    },
    {
      label: "Swallow Tobacco Juice",
      value: fagerstromTest.swallowTobaccoJuice,
    },
    {
      label: "Tobacco Hate to Give Up",
      value: fagerstromTest.tobaccoHateToGiveUp,
    },
    {
      label: "Tobacco Cans Per Week",
      value: fagerstromTest.tobaccoCansPerWeek,
    },
    {
      label: "Tobacco Chew More After Awakening",
      value: fagerstromTest.tobaccoChewMoreAfterAwakening ? "Yes" : "No",
    },
    {
      label: "Tobacco Chew When Ill",
      value: fagerstromTest.tobaccoChewWhenIll ? "Yes" : "No",
    },
  ];

  const title = `Fagerstrom Test Submitted on ${dayjsUtil
    .utc(fagerstromTest.submittedDate)
    .format("MM/DD/YYYY")}`;

  return (
    <SCFModal
      trigger={<InfoIcon onClick={() => setOpen(true)} />}
      title={title}
      width="min(90vw, 700px)"
      open={open}
      setOpen={setOpen}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {fagerstromTest.doesUseCigarettes && (
          <FormSection title="Cigarettes">
            {cigaretteResponses.map((response) => (
              <FormResponse
                key={response.label}
                label={response.label}
                value={response.value}
              />
            ))}
          </FormSection>
        )}

        {fagerstromTest.doesUseSmokelessTobacco && (
          <FormSection title="Smokeless Tobacco">
            {tobaccoResponses.map((response) => (
              <FormResponse
                key={response.label}
                label={response.label}
                value={response.value}
              />
            ))}
          </FormSection>
        )}
      </Box>
    </SCFModal>
  );
}
