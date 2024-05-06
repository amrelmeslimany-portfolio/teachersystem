import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { BadRequestException } from "./exceptions";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

export const sendEmail = async (options: Mail.Options, cb: (reply: SMTPTransport.SentMessageInfo) => void) => {
    try {
        const response = await transporter.sendMail(options);
        cb(response);
    } catch (error) {
        console.log("sending email error:", error);
        throw new BadRequestException("Email sending error");
    }
};
