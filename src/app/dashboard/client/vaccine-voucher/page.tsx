import { Box, Typography } from "@mui/material";
import { redirect } from "next/navigation";

import { getUserByEmail } from "@/server/api/users/queries";
import getUserSession from "@/utils/getUserSession";
import isUserEnrolledInProgram from "@/utils/isEnrolledInProgram";

export default async function VaccineVoucherPage() {
  const session = await getUserSession();

  if (!session) {
    redirect("/");
  }

  const [user, error] = await getUserByEmail(session.user.email, {
    populateProgramEnrollments: true,
  });

  if (error !== null) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>
          There was an error fetching your vaccine voucher enrollment.
        </Typography>
      </Box>
    );
  }

  if (user.role !== "client") {
    redirect("/dashboard");
  }

  const enrolledInVaccineVoucherProgram = isUserEnrolledInProgram(
    user.programEnrollments,
    "Vaccine Voucher",
  );

  if (!enrolledInVaccineVoucherProgram) {
    redirect("/dashboard/client");
  }

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>Vaccine Voucher Page</Typography>
    </Box>
  );
}
