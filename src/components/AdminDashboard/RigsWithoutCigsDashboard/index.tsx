"use client";

import { Box, Tab, Tabs, Typography } from "@mui/material";
import { ReactNode, useState } from "react";

import { ProgramEnrollment } from "@/types";

import RigsWithoutCigsClientDashboard from "./RigsWithoutCigsClientDashboard";
import RigsWithoutCigsMetric from "./RigsWithoutCigsMetric";

type RigsWithoutCigsSections = "clients" | "metrics";

type RigsWithoutCigsDashboardProps = {
  rigsWithoutCigsProgramEnrollments: ProgramEnrollment[];
};

export default function RigsWithoutCigsDashboard({
  rigsWithoutCigsProgramEnrollments,
}: RigsWithoutCigsDashboardProps): ReactNode {
  const [selectedSection, setSelectedSection] =
    useState<RigsWithoutCigsSections>("clients");

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: RigsWithoutCigsSections,
  ): void => {
    setSelectedSection(newValue);
  };

  function getSectionContent(section: RigsWithoutCigsSections): ReactNode {
    switch (section) {
      case "clients":
        return (
          <RigsWithoutCigsClientDashboard
            rigsWithoutCigsProgramEnrollments={
              rigsWithoutCigsProgramEnrollments
            }
          />
        );
      case "metrics":
        return <RigsWithoutCigsMetric />;
      default:
        return <Typography>Invalid section</Typography>;
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            alignSelf: "flex-start",
          }}
        >
          <Tabs
            value={selectedSection}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Clients" value="clients" />
            <Tab label="Metrics" value="metrics" />
          </Tabs>
        </Box>
        <Box sx={{ marginTop: 3, width: "100%" }}>
          {getSectionContent(selectedSection)}
        </Box>
      </Box>
    </>
  );
}
