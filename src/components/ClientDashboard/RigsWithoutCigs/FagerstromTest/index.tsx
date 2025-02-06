"use client";
import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { ReactNode, SyntheticEvent, useState } from "react";

import CigaretteFagerstromTest from "./CigaretteFagerstromTest";
import SmokelessTobaccoFagerstromTest from "./SmokelessTobaccoFagerstromTest";

type FagerstromTestSections = "cigarette" | "smokeless_tobacco";

export default function FagerstromTest(): ReactNode {
  const [selectedSection, setSelectedSection] =
    useState<FagerstromTestSections>("cigarette");

  const handleTabChange = (
    _event: SyntheticEvent,
    newValue: FagerstromTestSections,
  ): void => {
    setSelectedSection(newValue);
  };

  function getSectionContent(section: FagerstromTestSections): ReactNode {
    switch (section) {
      case "cigarette":
        return <CigaretteFagerstromTest />;
      case "smokeless_tobacco":
        return <SmokelessTobaccoFagerstromTest />;
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
          alignItems: "start",
          flexDirection: "column",
        }}
      >
        <Tabs
          value={selectedSection}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Cigarette" value="cigarette" />
          <Tab label="Smokeless Tobacco" value="smokeless_tobacco" />
        </Tabs>
      </Box>
      <Divider sx={{ width: "80vw", marginTop: 2 }} />
      <Box sx={{ marginTop: 3 }}>{getSectionContent(selectedSection)}</Box>
    </>
  );
}
