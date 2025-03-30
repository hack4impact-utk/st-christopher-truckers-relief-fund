import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Divider,
  Link,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";

type ClientProgramDashboardProps = {
  title: string;
  defaultTab: string;
  tabs: Record<
    string,
    {
      title: string;
      content: ReactNode;
    }
  >;
};

export default function ClientProgramDashboard({
  title,
  defaultTab,
  tabs,
}: Readonly<ClientProgramDashboardProps>): ReactNode {
  const [selectedTab, setSelectedTab] = useState(defaultTab);

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
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            href="/dashboard/client"
            startIcon={<ArrowBackIcon />}
            sx={{ my: 2 }}
          >
            Back
          </Button>
          <Typography sx={{ fontSize: "1.5rem", textAlign: "center" }}>
            {title}
          </Typography>
        </Box>
        <Tabs
          value={selectedTab}
          onChange={(_, newValue) => setSelectedTab(newValue)}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {Object.keys(tabs).map((key) => (
            <Tab key={key} value={key} label={tabs[key].title} />
          ))}
        </Tabs>
      </Box>
      <Divider sx={{ width: "80vw", marginTop: 2 }} />
      <Box sx={{ marginTop: 3 }}>{tabs[selectedTab].content}</Box>
    </>
  );
}
