"use client";
import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { ReactNode, SyntheticEvent, useState } from "react";

import { ClientUser, FagerstromTest, ProgramEnrollment } from "@/types";

import FagerstromTestForm from "./FagerstromTestForm";
import RigsWithoutCigsHistory from "./RigsWithoutCigsHistory";
import RigsWithoutCigsInfo from "./RigsWithoutCigsInfo";

type RigsWithoutCigsSections = "fagerstrom_test" | "history" | "info";

type RigsWithoutCigsProps = {
  user: ClientUser;
  programEnrollment: ProgramEnrollment;
};

export default function RigsWithoutCigs({
  user,
  programEnrollment,
}: RigsWithoutCigsProps): ReactNode {
  const [selectedSection, setSelectedSection] =
    useState<RigsWithoutCigsSections>("fagerstrom_test");

  const [fagerstromTests, setFagerstromTests] = useState<FagerstromTest[]>(
    user.fagerstromTests,
  );

  const handleTabChange = (
    _event: SyntheticEvent,
    newValue: RigsWithoutCigsSections,
  ): void => {
    setSelectedSection(newValue);
  };

  function getSectionContent(section: RigsWithoutCigsSections): ReactNode {
    switch (section) {
      case "fagerstrom_test":
        return (
          <FagerstromTestForm
            user={user}
            setFagerstromTests={setFagerstromTests}
          />
        );
      case "history":
        return (
          <RigsWithoutCigsHistory
            user={user}
            programEnrollment={programEnrollment}
            fagerstromTests={fagerstromTests}
            setFagerstromTests={setFagerstromTests}
          />
        );
      case "info":
        return <RigsWithoutCigsInfo user={user} />;
      default:
        return <Typography>Invalid section</Typography>;
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ width: "min(90vw, 700px)", marginBottom: 2 }}>
          <Typography sx={{ fontSize: "1.5rem", textAlign: "center" }}>
            Rigs Without Cigs Dashboard
          </Typography>
        </Box>
        <Tabs
          value={selectedSection}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Fagerstrom Test" value="fagerstrom_test" />
          <Tab label="History" value="history" />
          <Tab label="Info" value="info" />
        </Tabs>
      </Box>
      <Divider sx={{ width: "80vw", marginTop: 2 }} />
      <Box sx={{ marginTop: 3 }}>{getSectionContent(selectedSection)}</Box>
    </>
  );
}
