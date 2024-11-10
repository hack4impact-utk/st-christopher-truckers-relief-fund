import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function DisqualifiedPage() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="body1">
        We are sorry, but you do not qualify for any of the programs we offer.
        Please contact us at our{" "}
        <Link
          href="https://truckersfund.org/contact-us"
          style={{ textDecoration: "none" }}
        >
          <Typography variant="inherit" color="primary" component="span">
            contact page{" "}
          </Typography>
        </Link>
        if you have any questions or concerns.
      </Typography>
      <Link href="/" style={{ textDecoration: "none" }}>
        <Typography variant="body1" color="primary">
          Return to home
        </Typography>
      </Link>
    </Box>
  );
}
