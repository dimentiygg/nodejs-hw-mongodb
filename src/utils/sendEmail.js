import nodemailer from 'nodemailer';
import { SMTP } from '../constants/constants.js';
import env from '../utils/env.js';

const transporter = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST),
  port: Number(env(SMTP.SMTP_PORT)),
  auth: {
    user: env(SMTP.SMTP_USER),
    pass: env(SMTP.SMTP_PASSWORD),
  },
});

const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};

export default sendEmail;
