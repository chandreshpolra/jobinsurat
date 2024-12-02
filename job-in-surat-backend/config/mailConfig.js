const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'suratjobportal@gmail.com',
        pass: 'kmyx ehgn xkdh lstu'
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Error configuring transporter:', error);
    } else {
        console.log('Mail transporter configured successfully');
    }
});

module.exports = transporter;
