import { Box, Tab, Tabs } from "@mui/material";
import { ReactNode, useState } from "react";

type AdminProgramDashboardProps = {
  // Tabs config
  defaultTab: string;
  tabs: Record<
    string,
    {
      title: string;
      content: ReactNode;
    }
  >;
};

export default function AdminProgramDashboard({
  defaultTab,
  tabs,
}: AdminProgramDashboardProps): ReactNode {
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Box sx={{ alignSelf: "flex-start" }}>
          <Tabs
            value={selectedTab}
            onChange={(_, newValue) => setSelectedTab(newValue)}
            indicatorColor="primary"
            textColor="primary"
          >
            {Object.keys(tabs).map((key) => (
              <Tab key={key} value={key} label={tabs[key].title} />
            ))}
          </Tabs>
        </Box>

        <Box sx={{ flexGrow: 1 }}>{tabs[selectedTab].content}</Box>
      </Box>
    </>
  );
}
