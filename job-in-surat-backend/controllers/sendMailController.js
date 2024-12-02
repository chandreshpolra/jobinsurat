const transporter = require('../config/mailConfig');
const ApiResponse = require('../utils/ApiResponse');

exports.sendMailToClient = async (req, res) => {
  try {

    console.log(req.body)
    const { fullName, email, mobileNo, jobTitle, clientEmail } = req.body;

    const mailOptions = {
      from: email, // Sender's email
      to: clientEmail, // Client's email
      subject: `Application for ${jobTitle}`,
      html: `
            <h2>Job Application Details</h2>
            <p><strong>Applicant Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${mobileNo}</p>
        `
    };

    const info = await transporter.sendMail(mailOptions);
    return res.status(201).json(new ApiResponse(201, {}, "Email sent successfully"));

  } catch (error) {
    console.error('Error sending email:', error);
  }
};
