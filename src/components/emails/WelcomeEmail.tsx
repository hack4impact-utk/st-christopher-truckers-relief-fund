import {
  Button,
  Container,
  Hr,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import Logo from "@/components/Logo/index";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

interface WelcomeEmailProps {
  firstName: string;
  programName: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  firstName,
  programName,
}) => (
  <>
    <Preview>
      You&apos;ve been accepted into St. Christopher&apos;s Trucker Relief Fund!
    </Preview>
    <Container style={container}>
      <Section style={box}>
        <Logo
          width={100}
          height={100}
          alt="St. Christopher's Trucker Relief Fund Logo"
        />
        <Hr style={hr} />
        <Text style={paragraph}>
          Hello {firstName}! We are pleased to inform you that your application
          for {programName} has been accepted. Please click on the link below to
          access your dashboard.
        </Text>
        <Button style={button} href={`${baseUrl}/`}>
          View your SCF Dashboard
        </Button>
        <Hr style={hr} />
        <Text style={paragraph}>
          If you have any further questions or concerns, please don&apos;t
          hesitate to reach out to us at our{" "}
          <Link style={anchor} href="https://truckersfund.org/contact-us">
            contact page.
          </Link>
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          St. Christopher&apos;s Trucker Relief Fund, Phone: (865) 202 - 9428
        </Text>
      </Section>
    </Container>
  </>
);

export default WelcomeEmail;

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  marginTop: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const anchor = {
  color: "#556cd6",
};

const button = {
  backgroundColor: "#656ee8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};