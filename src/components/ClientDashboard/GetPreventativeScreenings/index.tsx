"use client";
import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { ReactNode, SyntheticEvent, useState } from "react";

import GetPreventativeScreeningsApply from "./GetPreventativeScreeningsApply";
import GetPreventativeScreeningsInfo from "./GetPreventativeScreeningsInfo";

type GetPreventativeScreeningsSections = "apply" | "history";

export default function GetPreventativeScreenings(): ReactNode {
  const [selectedSection, setSelectedSection] =
    useState<GetPreventativeScreeningsSections>("apply");

  const handleTabChange = (
    _event: SyntheticEvent,
    newValue: GetPreventativeScreeningsSections,
  ): void => {
    setSelectedSection(newValue);
  };

  function getSectionContent(
    section: GetPreventativeScreeningsSections,
  ): ReactNode {
    switch (section) {
      case "apply":
        return <GetPreventativeScreeningsApply />;
      case "history":
        return <GetPreventativeScreeningsInfo />;
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
        <Typography sx={{ fontSize: "1.5rem", marginBottom: 2 }}>
          Get Preventative Screenings Dashboard
        </Typography>
        <Tabs
          value={selectedSection}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Apply" value="apply" />
          <Tab label="History" value="history" />
        </Tabs>
      </Box>
      <Divider sx={{ width: "80vw", marginTop: 2 }} />
      <Box sx={{ marginTop: 3 }}>{getSectionContent(selectedSection)}</Box>
    </>
  );
}
