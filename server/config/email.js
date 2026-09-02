const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// =====================================================
// SEND OTP EMAIL
// =====================================================
const sendOTPEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: `"EcoTrack 🌱" <${process.env.EMAIL_USER}>`,

      to: email,

      subject: "EcoTrack Email Verification OTP",

      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <title>EcoTrack OTP</title>
        </head>

        <body
          style="
            margin:0;
            padding:0;
            background:#f4f7f4;
            font-family:Arial, sans-serif;
          "
        >

          <div
            style="
              max-width:600px;
              margin:40px auto;
              background:white;
              padding:30px;
              border-radius:12px;
              text-align:center;
            "
          >

            <h1 style="color:#2e7d32;">
              🌱 EcoTrack
            </h1>

            <h2>
              Email Verification
            </h2>

            <p>
              Thank you for registering with EcoTrack.
            </p>

            <p>
              Your verification OTP is:
            </p>

            <div
              style="
                margin:25px 0;
                padding:20px;
                background:#f1f8f2;
                border-radius:10px;
                font-size:32px;
                font-weight:bold;
                letter-spacing:8px;
                color:#2e7d32;
              "
            >
              ${otp}
            </div>

            <p>
              This OTP is valid for
              <strong>10 minutes</strong>.
            </p>

            <p style="color:#777;">
              If you did not create an EcoTrack account,
              you can safely ignore this email.
            </p>

            <hr style="margin:30px 0;" />

            <p style="color:#999;font-size:13px;">
              EcoTrack - Smart Waste Management 🌍
            </p>

          </div>

        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(
      "OTP email sent successfully:",
      info.messageId
    );

    return info;

  } catch (error) {
    console.error(
      "OTP email sending error:",
      error
    );

    throw error;
  }
};

// =====================================================
// EXPORT
// =====================================================
module.exports = sendOTPEmail;