"use client";

import Apps from "@mui/icons-material/Apps";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Home from "@mui/icons-material/Home";
import Insights from "@mui/icons-material/Insights";
import MedicationIcon from "@mui/icons-material/Medication";
import Notifications from "@mui/icons-material/Notifications";
import People from "@mui/icons-material/People";
import SmokeFreeIcon from "@mui/icons-material/SmokeFree";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import {
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

const drawerWidth = 200;

type SidebarButtonProps = {
  href: string;
  icon: ReactNode;
  label: string;
  padLeft?: boolean;
};

type CollapsibleSidebarButtonProps = SidebarButtonProps & {
  onClick: () => void;
};

export default function Sidebar() {
  const theme = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function SidebarButton({ href, icon, label, padLeft }: SidebarButtonProps) {
    return (
      <Link key={href} href={href} style={{ textDecoration: "none" }}>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              backgroundColor:
                pathname === href ? theme.palette.primary.main : "inherit",
              "&:hover": {
                backgroundColor:
                  pathname === href ? theme.palette.primary.light : "lightgray",
              },
              paddingLeft: padLeft ? 4 : undefined,
            }}
          >
            <ListItemIcon
              sx={{
                color:
                  pathname === href
                    ? theme.palette.primary.contrastText
                    : "black",
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={label}
              sx={{
                color:
                  pathname === href
                    ? theme.palette.primary.contrastText
                    : "black",
              }}
            />
          </ListItemButton>
        </ListItem>
      </Link>
    );
  }

  function CollapsibleSidebarButton({
    href,
    icon,
    label,
    onClick,
  }: CollapsibleSidebarButtonProps) {
    return (
      <ListItem disablePadding onClick={onClick}>
        <ListItemButton
          sx={{
            backgroundColor:
              pathname === href ? theme.palette.primary.main : "inherit",
            "&:hover": {
              backgroundColor:
                pathname === href ? theme.palette.primary.light : "lightgray",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color:
                pathname === href
                  ? theme.palette.primary.contrastText
                  : "black",
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={label}
            sx={{
              color:
                pathname === href
                  ? theme.palette.primary.contrastText
                  : "black",
            }}
          />
          {open ? (
            <ExpandLess
              sx={{
                color:
                  pathname === href
                    ? theme.palette.primary.contrastText
                    : "black",
              }}
            />
          ) : (
            <ExpandMore
              sx={{
                color:
                  pathname === href
                    ? theme.palette.primary.contrastText
                    : "black",
              }}
            />
          )}
        </ListItemButton>
      </ListItem>
    );
  }

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
      <List>
        <CollapsibleSidebarButton
          href="/dashboard/admin/programs"
          icon={<Apps />}
          label="Programs"
          onClick={() => setOpen(!open)}
        />
        <Collapse in={open} timeout="auto" unmountOnExit>
          <SidebarButton
            href="/dashboard/admin/programs/healthy-habits"
            icon={<Insights />}
            label="Healthy Habits"
            padLeft
          />
          <SidebarButton
            href="/dashboard/admin/programs/diabetes-prevention"
            icon={<MedicationIcon />}
            label="Diabetes Prevention"
            padLeft
          />
          <SidebarButton
            href="/dashboard/admin/programs/rigs-without-cigs"
            icon={<SmokeFreeIcon />}
            label="Rigs Without Cigs"
            padLeft
          />
          <SidebarButton
            href="/dashboard/admin/programs/vaccine-voucher"
            icon={<VaccinesIcon />}
            label="Vaccine Voucher"
            padLeft
          />
          <SidebarButton
            href="/dashboard/admin/programs/get-preventative-screenings"
            icon={<TroubleshootIcon />}
            label="Get Preventative Screenings"
            padLeft
          />
        </Collapse>

        <SidebarButton
          href="/dashboard/admin/clients"
          icon={<People />}
          label="Clients"
        />
        <SidebarButton
          href="/dashboard/admin/notifications"
          icon={<Notifications />}
          label="Notifications"
        />
        <SidebarButton
          href="/dashboard/admin/applications"
          icon={<Home />}
          label="Applications"
        />
      </List>
    </Drawer>
  );
}
