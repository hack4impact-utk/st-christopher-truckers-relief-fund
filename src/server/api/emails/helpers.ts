import { createTransport, Transporter } from "nodemailer";
import { Message, ServerClient } from "postmark";

import { FEATURE_FLAGS } from "@/utils/constants/featureFlag";

import { getFeatureFlag } from "../feature-flags/queries";

export default async function sendEmail(
  recipient: string,
  subject: string,
  html: string,
): Promise<void> {
  const isEmailEnabled = await getFeatureFlag(FEATURE_FLAGS.EMAIL.ENABLED);

  if (!isEmailEnabled) {
    console.error("Email sending is currently disabled.");
    return;
  }

  const postmarkSendingEnabled = await getFeatureFlag(
    FEATURE_FLAGS.EMAIL.POSTMARK_SENDING_ENABLED,
  );

  if (postmarkSendingEnabled) {
    await sendPostmarkEmail(recipient, subject, html);
  } else {
    await sendNodemailerEmail(recipient, subject, html);
  }
}

async function sendPostmarkEmail(
  recipient: string,
  subject: string,
  html: string,
): Promise<void> {
  try {
    const postmarkApiKey = process.env.POSTMARK_API_KEY;

    if (!postmarkApiKey) {
      throw new Error("Missing environment variable POSTMARK_API_KEY");
    }

    const postmarkClient = new ServerClient(postmarkApiKey);

    const email = process.env.POSTMARK_SENDER_SIGNATURE;

    const mailOptions: Message = {
      From: email,
      To: recipient,
      Subject: subject,
      HtmlBody: html,
      TextBody: html,
      MessageStream: "outbound",
    };

    await postmarkClient.sendEmail(mailOptions);
  } catch (error) {
    console.error(error);
  }
}

async function sendNodemailerEmail(
  recipient: string,
  subject: string,
  html: string,
): Promise<void> {
  try {
    const transporter = getNodemailerTransporter();

    const email = process.env.SCF_GMAIL;

    const mailOptions = {
      from: `St. Christopher Truckers Relief Fund <${email}>`,
      to: recipient,
      subject,
      html,
      text: html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
    return;
  }
}

function getNodemailerTransporter(): Transporter {
  const email = process.env.SCF_GMAIL;
  const password = process.env.SCF_GMAIL_APP_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "Missing environment variables SCF_GMAIL or SCF_GMAIL_APP_PASSWORD",
    );
  }

  const transporter = createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: email,
      pass: password,
    },
  });

  return transporter;
}
