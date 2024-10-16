"use server";
import nodemailer from "nodemailer";

async function sendEmail(
  first_name: string,
  last_name: string,
  email: string,
  message: string,
) {
  console.log("asda");
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "lozamitry@gmail.com",
      pass: "lomw nzzq xqan kxrh",
    },
  });

  let mailOptions = {
    from: '"Dmitry Loza" <lozamitry@gmail.com>',
    to: "ankarn41k@gmail.com",
    subject: `message from ${first_name} ${last_name} on Keyguests`,
    html: `<b>Name:</b> ${first_name} ${last_name}<br><b>Email:</b> ${email}<br><b>Message:</b> ${message}`,
  };

  try {
    console.log(2222);
    let info = await transporter.sendMail(mailOptions);
    console.log(info);
    return info;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { sendEmail };
