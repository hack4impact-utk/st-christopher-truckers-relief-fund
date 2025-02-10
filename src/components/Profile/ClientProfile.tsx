import { Box, Divider, List, ListItem, Typography } from "@mui/material";
import { ReactNode } from "react";

import { User } from "@/types";

import ChangePasswordButton from "../Profile/ChangePasswordButton";
import SignOutButton from "../Profile/SignOutButton";

type ClientSettingsProps = {
  user: User;
};

export default function ClientSettings({
  user,
}: ClientSettingsProps): ReactNode {
  if (user.role !== "client") {
    return null;
  }

  return (
    <Box
      sx={{
        width: "min(90vw, 700px)",
        height: "min(90vw, 700px)",
        overflowY: "auto",
        boxShadow: 3,
        borderRadius: 2,
        padding: 4,
      }}
    >
      <Typography variant="h4" textAlign="center">
        Client Profile
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography>
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </Typography>
        <Typography>
          <strong>Email:</strong> {user.email}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">Accepted Programs</Typography>
      <List>
        {user.programEnrollments.map((programEnrollment) => {
          return programEnrollment.status === "accepted" ? (
            <ListItem key={programEnrollment._id} disablePadding>
              <Typography>{programEnrollment.program}</Typography>
            </ListItem>
          ) : null;
        })}
      </List>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">Program Admin Contact</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography>
          <strong>Phone Number:</strong> 865-202-9428
        </Typography>
        <Typography>
          <strong>Fax:</strong> 865-851-8396
        </Typography>
        <Typography>
          <strong>Hours of Operation:</strong> Mon-Thur 9 a.m.-3 p.m.
        </Typography>

        <Box sx={{ gap: 0 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Executive Director:
          </Typography>
          <Typography>Donna Kennedy, Ph.D, M.S.</Typography>
          <Typography>
            <a href="mailto:director@truckersfund.org">
              director@truckersfund.org
            </a>
          </Typography>
        </Box>

        <Box sx={{ gap: 0 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Front Office:
          </Typography>
          <Typography>
            <a href="mailto:contact@truckersfund.org">
              contact@truckersfund.org
            </a>
          </Typography>
        </Box>

        <Box sx={{ gap: 0 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Director of Philanthropy:
          </Typography>
          <Typography>Shannon Currier</Typography>
          <Typography>
            <a href="mailto:shannon@truckersfund.org">
              shannon@truckersfund.org
            </a>
          </Typography>
        </Box>

        <Box sx={{ gap: 0 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Health & Wellness Manager:
          </Typography>
          <Typography>Lindsey Bryan</Typography>
          <Typography>
            <a href="mailto:health@truckersfund.org">health@truckersfund.org</a>
          </Typography>
        </Box>

        <Box sx={{ gap: 0 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Media Coordinator:
          </Typography>
          <Typography>Nick Oliver</Typography>
          <Typography>
            <a href="mailto:media@truckersfund.org">media@truckersfund.org</a>
          </Typography>
        </Box>

        <Box sx={{ gap: 0 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Mail:
          </Typography>
          <Typography>
            St. Christopher Fund PO Box 30763 Knoxville, TN 37930
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mt: 4,
        }}
      >
        <ChangePasswordButton />
        <SignOutButton />
      </Box>
    </Box>
  );
}
