"use client";
import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { ReactNode, SyntheticEvent, useState } from "react";

import { ClientUser } from "@/types";

import FagerstromTest from "./FagerstromTest";
import RigsWithoutCigsHistory from "./RigsWithoutCigsHistory";
import RigsWithoutCigsInfo from "./RigsWithoutCigsInfo";

type RigsWithoutCigsSections = "fagerstrom_test" | "history" | "info";

type RigsWithoutCigsProps = {
  user: ClientUser;
};

export default function RigsWithoutCigs({
  user,
}: RigsWithoutCigsProps): ReactNode {
  const [selectedSection, setSelectedSection] =
    useState<RigsWithoutCigsSections>("fagerstrom_test");

  const handleTabChange = (
    _event: SyntheticEvent,
    newValue: RigsWithoutCigsSections,
  ): void => {
    setSelectedSection(newValue);
  };

  function getSectionContent(section: RigsWithoutCigsSections): ReactNode {
    switch (section) {
      case "fagerstrom_test":
        return <FagerstromTest user={user} />;
      case "history":
        return <RigsWithoutCigsHistory user={user} />;
      case "info":
        return <RigsWithoutCigsInfo />;
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
          Rigs Without Cigs Dashboard
        </Typography>
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
