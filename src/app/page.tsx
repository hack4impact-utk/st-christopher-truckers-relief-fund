import { render } from "@react-email/components";
import nodemailer from "nodemailer";

import WelcomeEmail from "@/components/emails/WelcomeEmail";

const transporter = nodemailer.createTransport({
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SCF_GMAIL,
    pass: process.env.SCF_GMAIL_APP_PASSWORD,
  },
});

async function sendEmail() {
  const emailHtml = await render(
    <WelcomeEmail firstName="Alan" programName="Test" />,
  );

  const options = {
    from: process.env.SCF_GMAIL,
    to: "khalilialan@gmail.com", // Replace with your email
    subject: "hello world",
    html: emailHtml,
  };

  await transporter.sendMail(options);
  console.log("Email sent");
}

sendEmail();

export default function Home() {
  return <p>Home page</p>;
}
