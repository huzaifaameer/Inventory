require('dotenv').config();

const nodemailer = require('nodemailer');

const sendEmail = (sendTo, subject, body) => {
    let transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: sendTo,
        subject: subject,
        text: body,
    };

    transport.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err)
        }
    });
}

module.exports = sendEmail;