const nodeMailer = require("nodemailer")
const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    secure: false,
    auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_API
    }
})
function sendEmail(email, subject, text) {
    transporter.sendMail({
        from: process.env.EMAIL_SENDER,
        to: email,
        subject: subject,
        text: text
    })
}

module.exports = {
    sendEmail
}