import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async () => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"UG-PG Study" <${process.env.EMAIL_USER}>`,
      to: "yourmail@gmail.com",
      subject: "Test Mail",
      text: "This is a test mail",
    });

    console.log("✅ Test mail sent:", info.messageId);
  } catch (err) {
    console.error("❌ Mail test error:", err);
  }
};

