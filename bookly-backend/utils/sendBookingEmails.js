// utils/sendBookingEmail.js
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendBookingEmail = async ({ name, email, phone, slot }) => {
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: [process.env.RESEND_TO_EMAIL || process.env.RESEND_FROM_EMAIL], // send to owner
      subject: 'New Booking Received',
      html: `
        <h2>New Booking on Bookly</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Date:</strong> ${slot.date}</p>
        <p><strong>Time:</strong> ${slot.time}</p>
      `,
    });

    console.log("✅ Booking email sent via Resend");
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
};

module.exports = sendBookingEmail;
