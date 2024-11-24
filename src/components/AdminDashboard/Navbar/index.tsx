"use client";

import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppsIcon from '@mui/icons-material/Apps';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
      width: 240,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: 240,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
      <List>
        <ListItem component={Link} href="/dashboard/admin/programs" sx={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Programs" />
        </ListItem>
        <ListItem component={Link} href="/dashboard/admin/clients" sx={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Clients" />
        </ListItem>
        <ListItem component={Link} href="/dashboard/admin/notifications" sx={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItemIcon>
          <NotificationsIcon />
        </ListItemIcon>
        <ListItemText primary="Notifications" />
        </ListItem>
        <ListItem component={Link} href="/dashboard/admin/applications" sx={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItemIcon>
          <AppsIcon />
        </ListItemIcon>
        <ListItemText primary="Applications" />
        </ListItem>
      </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;