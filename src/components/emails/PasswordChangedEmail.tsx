import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import imgurLogoImageUrl from "@/utils/constants/imgurLogoImageUrl";

type PasswordChangedEmailProps = {
  firstName: string;
};

export default function PasswordChangedEmail({
  firstName,
}: PasswordChangedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your SCF password was changed</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Img
              src={imgurLogoImageUrl}
              width="128"
              height="128"
              alt="St. Christopher Truckers Relief Fund"
              style={image}
            />
            <Text style={paragraph}>
              Hello {firstName}, your password to the SCF Dashboard has been
              changed. If this was you, you can safely disregard this email. If
              you have any questions or concerns, please reach out to us at our{" "}
              <Link style={anchor} href="https://truckersfund.org/contact-us">
                contact page.
              </Link>
            </Text>
            <Hr style={hr} />
            <Text style={footer}>
              St. Christopher Truckers Relief Fund, Phone: (865) 202-9428
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

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

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};

const image = {
  margin: "0 auto",
};
