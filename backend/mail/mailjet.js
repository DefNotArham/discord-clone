import dotenv from "dotenv";
import Mailjet from "node-mailjet";
import {
  verificationEmailTemplate,
  resetPasswordEmailTemplate,
} from "../mail/mailTemplates.js";

dotenv.config();

const MailjetApiKey = process.env.MailjetApiKey;
const MailjetSecretKey = process.env.MailjetSecretKey;

const mailjet = Mailjet.apiConnect(MailjetApiKey, MailjetSecretKey);

export const sendVerificationEmail = async (userEmail, verificationCode) => {
  try {
    const request = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "arhamkabir231@gmail.com", // must be verified in Mailjet
            Name: "Chat App",
          },
          To: [
            {
              Email: userEmail,
            },
          ],
          Subject: "Verify your account",
          HTMLPart: verificationEmailTemplate(verificationCode),
        },
      ],
    });

    console.log("Email sent:", request.body);
  } catch (error) {
    console.log("Email error:", error);
  }
};

export const resetPasswordEmail = async (userEmail, resetToken) => {
  try {
    const request = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "arhamkabir231@gmail.com", // must be verified in Mailjet
            Name: "Chat App",
          },
          To: [
            {
              Email: userEmail,
            },
          ],
          Subject: "Reset your password",
          HTMLPart: resetPasswordEmailTemplate(resetToken),
        },
      ],
    });

    console.log("Email sent:", request.body);
  } catch (error) {
    console.log("Email error:", error);
  }
};
