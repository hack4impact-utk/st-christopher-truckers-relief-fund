"use client";

import { Apps, Home, Notifications, People } from "@mui/icons-material";
import {
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
import React from "react";

const drawerWidth = 200;

export default function Sidebar() {
  const theme = useTheme();
  const pathname = usePathname();

  const links = [
    { href: "/dashboard/admin/programs", label: "Programs", icon: <Apps /> },
    { href: "/dashboard/admin/clients", label: "Clients", icon: <People /> },
    {
      href: "/dashboard/admin/notifications",
      label: "Notifications",
      icon: <Notifications />,
    },
    {
      href: "/dashboard/admin/applications",
      label: "Applications",
      icon: <Home />,
    },
  ];

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
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            passHref
            style={{ textDecoration: "none" }}
          >
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  backgroundColor:
                    pathname === link.href
                      ? theme.palette.primary.main
                      : "inherit",
                  "&:hover": {
                    backgroundColor:
                      pathname === link.href
                        ? theme.palette.primary.light
                        : "lightgray",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      pathname === link.href
                        ? theme.palette.primary.contrastText
                        : "darkgray",
                  }}
                >
                  {link.icon}
                </ListItemIcon>
                <ListItemText
                  primary={link.label}
                  sx={{
                    color:
                      pathname === link.href
                        ? theme.palette.primary.contrastText
                        : "darkgray",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}
