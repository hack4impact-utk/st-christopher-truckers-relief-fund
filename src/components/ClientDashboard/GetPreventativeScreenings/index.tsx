"use client";
import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { ReactNode, SyntheticEvent, useState } from "react";

import { ClientUser, ScreeningRequest } from "@/types";

import GetPreventativeScreeningsHistory from "./GetPreventativeScreeningsHistory";
import GetPreventativeScreeningsRequestForm from "./GetPreventativeScreeningsRequestForm";

type GetPreventativeScreeningsSections = "apply" | "history";

type GetPreventativeScreeningsProps = {
  user: ClientUser;
};

export default function GetPreventativeScreenings({
  user,
}: GetPreventativeScreeningsProps): ReactNode {
  const [selectedSection, setSelectedSection] =
    useState<GetPreventativeScreeningsSections>("apply");

  const [screeningRequests, setScreeningRequests] = useState<
    ScreeningRequest[]
  >(user.screeningRequests);

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
        return (
          <GetPreventativeScreeningsRequestForm
            user={user}
            screeningRequests={screeningRequests}
            setScreeningRequests={setScreeningRequests}
          />
        );
      case "history":
        return (
          <GetPreventativeScreeningsHistory
            screeningRequests={screeningRequests}
            setScreeningRequests={setScreeningRequests}
          />
        );
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
            Get Preventative Screenings Dashboard
          </Typography>
        </Box>
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
