"use client";

import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { ReactNode, SyntheticEvent, useState } from "react";

import VaccineVoucherApplyForm from "@/components/ClientDashboard/VaccineVoucher/VaccineVoucherApplyForm";
import VaccineVoucherHistory from "@/components/ClientDashboard/VaccineVoucher/VaccineVoucherHistory";
import { ClientUser } from "@/types";

type VaccineVoucherSections = "apply" | "history";

type VaccineVoucherDashboardProps = {
  user: ClientUser;
};

export default function VaccineVoucherDashboard({
  user,
}: VaccineVoucherDashboardProps): JSX.Element {
  const [selectedSection, setSelectedSection] =
    useState<VaccineVoucherSections>("apply");

  const handleTabChange = (
    _event: SyntheticEvent,
    newValue: VaccineVoucherSections,
  ): void => {
    setSelectedSection(newValue);
  };

  function getSectionContent(section: VaccineVoucherSections): ReactNode {
    switch (section) {
      case "apply":
        return <VaccineVoucherApplyForm user={user} />;
      case "history":
        return <VaccineVoucherHistory />;
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
            Vaccine Voucher Dashboard
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
