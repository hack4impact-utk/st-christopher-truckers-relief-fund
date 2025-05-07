import {
  Body,
  Button,
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
import { ReactNode } from "react";

import transparentLogoUrl from "@/utils/constants/transparentLogoUrl";

type BaseEmailProps = {
  previewText: string;
  text: string | string[];
};

type EmailWithTextProps = BaseEmailProps & {
  type: "text-only";
};

type EmailWithTextAndButtonProps = BaseEmailProps & {
  type: "text-and-button";
  buttonText: string;
  buttonUrl: string;
};

type SCFEmailProps = EmailWithTextProps | EmailWithTextAndButtonProps;

export default function SCFEmail(props: SCFEmailProps): ReactNode {
  return (
    <Html>
      <Head />
      <Preview>{props.previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Img
              src={transparentLogoUrl}
              width="128"
              height="128"
              alt="St. Christopher Truckers Relief Fund"
              style={image}
            />

            {Array.isArray(props.text) ? (
              props.text.map((text, index) => (
                <Text key={index + text} style={paragraph}>
                  {text}
                </Text>
              ))
            ) : (
              <Text style={paragraph}>{props.text}</Text>
            )}

            {props.type === "text-and-button" && (
              <Button style={button} href={props.buttonUrl}>
                {props.buttonText}
              </Button>
            )}

            <Text style={paragraph}>
              If you have any questions or concerns, please reach out to us at
              our{" "}
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

const button = {
  backgroundColor: "#183766",
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

const image = {
  margin: "0 auto",
};
