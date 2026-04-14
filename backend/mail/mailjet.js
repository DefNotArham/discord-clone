import dotenv from "dotenv";
import Mailjet from "node-mailjet";

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
            Name: "Your App",
          },
          To: [
            {
              Email: userEmail,
            },
          ],
          Subject: "Verify your account",
          TextPart: `Your verification code is: ${verificationCode}`,
          HTMLPart: `<h3>Your verification code is: ${verificationCode}</h3>`,
        },
      ],
    });

    console.log("Email sent:", request.body);
  } catch (error) {
    console.log("Email error:", error);
  }
};
