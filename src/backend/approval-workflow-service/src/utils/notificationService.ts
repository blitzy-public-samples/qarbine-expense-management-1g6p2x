// Import nodemailer version 6.6.3 for sending email notifications.
// nodemailer is used to handle email transport.
// Version: 6.6.3
import nodemailer from 'nodemailer';

// Import configuration module to manage environment-specific configurations.
import config from 'config';

// Load email service configurations from config files.
// This ensures sensitive data such as SMTP credentials are not hard-coded.
const emailConfig = config.get('email');

// Configure the email service instance for sending notifications.
// The transporter is configured using SMTP credentials.
const emailService = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  secure: emailConfig.secure, // true for port 465, false for other ports
  auth: {
    user: emailConfig.auth.user,
    pass: emailConfig.auth.pass,
  },
});

// Verify the connection configuration.
emailService.verify(function (error, success) {
  if (error) {
    console.error('Email service configuration error:', error);
  } else {
    console.log('Email service is ready to send messages');
  }
});

// Export the emailService instance for use in other modules if necessary.
export { emailService };

/**
 * Sends an email notification to the user regarding the status of their approval request.
 *
 * This function addresses the following requirement:
 * - Technical Requirement: TR-F004.3
 * - Description: Provide in-app notifications for pending approvals
 * - Location: Technical Specification/13.4 Approval Workflow
 *
 * @param recipientEmail - The email address of the recipient.
 * @param subject - The subject of the email.
 * @param message - The body content of the email.
 * @returns A Promise that resolves when the email has been successfully sent.
 */
export async function sendApprovalNotification(
  recipientEmail: string,
  subject: string,
  message: string
): Promise<void> {
  // Step 1: Configure the email options including recipient, subject, and message body.
  const mailOptions = {
    from: emailConfig.fromAddress, // Sender address configured in email settings.
    to: recipientEmail, // Recipient's email address.
    subject: subject, // Subject line of the email.
    text: message, // Plain text body of the email.
    // html: `<b>${message}</b>` // Optional HTML body.
  };

  try {
    // Step 2: Use the nodemailer service to send the email.
    const info = await emailService.sendMail(mailOptions);

    // Optional: Log the message ID or other information for debugging purposes.
    console.log('Approval notification email sent: %s', info.messageId);

    // Step 4: Resolve the promise upon successful sending of the email.
    // The async function will implicitly resolve when execution completes without errors.
  } catch (error) {
    // Step 3: Handle any errors that occur during the sending process.
    console.error('Error sending approval notification email:', error);
    // Re-throw the error to allow calling functions to handle it appropriately.
    throw error;
  }
}