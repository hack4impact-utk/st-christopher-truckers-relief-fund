import { createTransport } from "nodemailer";

function getTransporter() {
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

export default async function sendEmail(
  recipient: string,
  subject: string,
  html: string,
) {
  const transporter = getTransporter();

  const email = process.env.SCF_GMAIL;

  const mailOptions = {
    from: `St. Christopher Truckers Relief Fund <${email}>`,
    to: recipient,
    subject,
    html,
    text: html,
  };

  const response = await transporter.sendMail(mailOptions);

  return response;
}
