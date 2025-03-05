"use client";

import { Box, Tab, Tabs, Typography } from "@mui/material";
import { ReactNode, useState } from "react";

import { ProgramEnrollment } from "@/types";

import VaccineVoucherClientDashboard from "./VaccineVoucherDashboard";
import VaccineVoucherMetrics from "./VaccineVoucherMetrics";

type VaccineVoucherSections = "clients" | "metrics";

type VaccineVoucherDashboardProps = {
  vaccineVoucherProgramEnrollments: ProgramEnrollment[];
};

export default function VaccineVoucherDashboard({
  vaccineVoucherProgramEnrollments,
}: VaccineVoucherDashboardProps): ReactNode {
  const [selectedSection, setSelectedSection] =
    useState<VaccineVoucherSections>("clients");

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: VaccineVoucherSections,
  ): void => {
    setSelectedSection(newValue);
  };

  function getSectionContent(section: VaccineVoucherSections): ReactNode {
    switch (section) {
      case "clients":
        return (
          <VaccineVoucherClientDashboard
            VaccineVoucherProgramEnrollments={vaccineVoucherProgramEnrollments}
          />
        );
      case "metrics":
        return (
          <VaccineVoucherMetrics
            VaccineVoucherProgramEnrollments={vaccineVoucherProgramEnrollments}
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
