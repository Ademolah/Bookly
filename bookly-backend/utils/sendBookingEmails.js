// server/utils/sendBookingEmail.js
const nodemailer = require("nodemailer");

const sendBookingEmail = async ({ name, email, phone, slot }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,     // your Gmail
      pass: process.env.EMAIL_PASS,     // Gmail App Password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: [email, process.env.OWNER_EMAIL], // client + owner
    subject: `Booking Confirmation for ${slot.date} at ${slot.time}`,
    html: `
      <h2>Hi ${name},</h2>
      <p>Your booking for <strong>${slot.date} at ${slot.time}</strong> is confirmed.</p>
      <p>Phone: ${phone}</p>
      <p>Thank you for choosing Bookly!</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendBookingEmail;
