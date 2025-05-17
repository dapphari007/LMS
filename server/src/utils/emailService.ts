import nodemailer from 'nodemailer';
import config from '../config/config';
import logger from './logger';

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  cc?: string | string[];
  bcc?: string | string[];
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.port === 465,
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const mailOptions = {
        from: config.email.from,
        to: options.to,
        cc: options.cc,
        bcc: options.bcc,
        subject: options.subject,
        html: options.html,
      };

      await this.transporter.sendMail(mailOptions);
      logger.info(`Email sent to ${options.to}`);
      return true;
    } catch (error) {
      logger.error(`Error sending email: ${error}`);
      return false;
    }
  }

  // Email templates for different notifications
  async sendLeaveRequestNotification(
    managerEmail: string,
    employeeName: string,
    leaveType: string,
    startDate: string,
    endDate: string,
    reason: string
  ): Promise<boolean> {
    const subject = `Leave Request from ${employeeName}`;
    const html = `
      <h2>New Leave Request</h2>
      <p><strong>Employee:</strong> ${employeeName}</p>
      <p><strong>Leave Type:</strong> ${leaveType}</p>
      <p><strong>From:</strong> ${startDate}</p>
      <p><strong>To:</strong> ${endDate}</p>
      <p><strong>Reason:</strong> ${reason}</p>
      <p>Please login to the system to approve or reject this request.</p>
    `;

    return this.sendEmail({ to: managerEmail, subject, html });
  }

  async sendLeaveStatusUpdateNotification(
    employeeEmail: string,
    leaveType: string,
    startDate: string,
    endDate: string,
    status: string,
    comments?: string
  ): Promise<boolean> {
    const subject = `Leave Request ${status}`;
    let html = `
      <h2>Leave Request ${status}</h2>
      <p><strong>Leave Type:</strong> ${leaveType}</p>
      <p><strong>From:</strong> ${startDate}</p>
      <p><strong>To:</strong> ${endDate}</p>
      <p><strong>Status:</strong> ${status}</p>
    `;

    if (comments) {
      html += `<p><strong>Comments:</strong> ${comments}</p>`;
    }

    return this.sendEmail({ to: employeeEmail, subject, html });
  }

  async sendLeaveBalanceUpdateNotification(
    employeeEmail: string,
    leaveType: string,
    newBalance: number
  ): Promise<boolean> {
    const subject = `Leave Balance Update`;
    const html = `
      <h2>Leave Balance Update</h2>
      <p>Your ${leaveType} leave balance has been updated.</p>
      <p><strong>New Balance:</strong> ${newBalance} days</p>
    `;

    return this.sendEmail({ to: employeeEmail, subject, html });
  }

  async sendLeavePolicyUpdateNotification(
    employeeEmails: string[],
    policyName: string,
    changes: string
  ): Promise<boolean> {
    const subject = `Leave Policy Update: ${policyName}`;
    const html = `
      <h2>Leave Policy Update</h2>
      <p>The following changes have been made to the ${policyName} policy:</p>
      <p>${changes}</p>
    `;

    return this.sendEmail({ to: employeeEmails, subject, html });
  }
}

export default new EmailService();