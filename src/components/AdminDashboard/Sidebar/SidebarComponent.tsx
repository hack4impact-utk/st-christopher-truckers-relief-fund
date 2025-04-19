"use client";

import Apps from "@mui/icons-material/Apps";
import Description from "@mui/icons-material/Description";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Insights from "@mui/icons-material/Insights";
import MedicationIcon from "@mui/icons-material/Medication";
import Notifications from "@mui/icons-material/Notifications";
import People from "@mui/icons-material/People";
import SmokeFreeIcon from "@mui/icons-material/SmokeFree";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import {
  Badge,
  Box,
  Collapse,
  Drawer,
  List,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

import CollapsibleSidebarButton from "./CollapsibleSidebarButton";
import SidebarButton from "./SidebarButton";

const drawerWidth = 200;

type SidebarChildItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
};

type SidebarItem =
  | {
      type: "standard";
      label: string;
      icon: React.ReactNode;
      href: string;
    }
  | {
      type: "collapsible";
      label: string;
      icon: React.ReactNode;
      href: string;
      children: SidebarChildItem[];
    };

function getSidebarItems(numberOfUrgentMeetingRequests: number): SidebarItem[] {
  return [
    {
      type: "collapsible",
      label: "Programs",
      icon: <Apps />,
      href: "/dashboard/admin/programs",
      children: [
        {
          label: "Healthy Habits",
          icon: <Insights />,
          href: "/dashboard/admin/programs/healthy-habits",
        },
        {
          label: "Diabetes Prevention",
          icon: <MedicationIcon />,
          href: "/dashboard/admin/programs/diabetes-prevention",
        },
        {
          label: "Rigs Without Cigs",
          icon: <SmokeFreeIcon />,
          href: "/dashboard/admin/programs/rigs-without-cigs",
        },
        {
          label: "Vaccine Voucher",
          icon: <VaccinesIcon />,
          href: "/dashboard/admin/programs/vaccine-voucher",
        },
        {
          label: "Get Preventative Screenings",
          icon: <TroubleshootIcon />,
          href: "/dashboard/admin/programs/get-preventative-screenings",
        },
      ],
    },
    {
      type: "standard",
      label: "Clients",
      icon: <People />,
      href: "/dashboard/admin/clients",
    },
    {
      type: "standard",
      label: "Notifications",
      icon: (
        <Badge badgeContent={numberOfUrgentMeetingRequests} color="error">
          <Notifications />
        </Badge>
      ),

      href: "/dashboard/admin/notifications",
    },
    {
      type: "standard",
      label: "Applications",
      icon: <Description />,
      href: "/dashboard/admin/applications",
    },
    {
      type: "standard",
      label: "Data Export",
      icon: <FileDownloadIcon />,
      href: "/dashboard/admin/data-export",
    },
  ];
}

export default function Sidebar(): ReactNode {
  const theme = useTheme();
  const pathname = usePathname();

  const isOnProgramsSubpage = pathname.startsWith("/dashboard/admin/programs");

  const [open, setOpen] = useState(isOnProgramsSubpage);

  const { data } = useQuery({
    queryKey: ["numberOfUrgentMeetingRequests"],
    queryFn: async () => {
      const response = await fetch("/api/urgent-meeting-requests");
      return await response.json();
    },
  });

  const sidebarItems = getSidebarItems(
    data?.data?.numberOfUrgentMeetingRequests,
  );

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        marginTop: "100px",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          marginTop: "100px",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <List
        sx={{
          height: "75vh",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "lightgray",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "gray",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        }}
        disablePadding
      >
        {sidebarItems.map((item) => {
          if (item.type === "collapsible") {
            return (
              <Box key={item.href}>
                <CollapsibleSidebarButton
                  pathname={pathname}
                  theme={theme}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  onClick={() => setOpen((prev) => !prev)}
                />
                <Collapse in={open} timeout="auto" unmountOnExit>
                  {item.children.map((child) => (
                    <SidebarButton
                      key={child.href}
                      pathname={pathname}
                      theme={theme}
                      href={child.href}
                      icon={child.icon}
                      label={child.label}
                      padLeft
                    />
                  ))}
                </Collapse>
              </Box>
            );
          }

          return (
            <SidebarButton
              key={item.href}
              pathname={pathname}
              theme={theme}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          );
        })}
      </List>
    </Drawer>
  );
}
