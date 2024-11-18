import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplate.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.log(`Error sending verification ${error}`);

    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "8a0f95a2-ef37-4461-8ff7-1b36bf154d6c",
      template_variables: {
        name: name,
        company_info_name: "HCMC-Globals",
      },
    });

    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.log(`Error sending  ${error}`);

    throw new Error(`Error sending  email: ${error}`);
  }
};

export const sendResetPasswordEmail = async (email, url) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your account password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", url),
      category: "Password Reset",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.log(`Error sending reset password ${error}`);

    throw new Error(`Error sending reset password email: ${error}`);
  }
};

export const sendResetPasswordSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successfully",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.log(`Error sending reset password success ${error}`);

    throw new Error(`Error sending reset password success email: ${error}`);
  }
};
