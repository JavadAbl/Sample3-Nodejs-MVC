import { createTransport } from "nodemailer";

class EmailProvider {
  #transporter;

  constructor(config) {
    this.#transporter = createTransport(config);
  }

  async sendMail({ from, to, subject, text, html, attachments }) {
    const mailOptions = {
      from,
      to,
      subject,
      text,
      html,
      attachments,
    };

    try {
      const info = await this.#transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
    } catch (error) {
      console.error("Error occurred: " + error.message);
    }
  }
}

const emailConfig = {
  //service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
};

export const emailProvider = new EmailProvider(emailConfig);
