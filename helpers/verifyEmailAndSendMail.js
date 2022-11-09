const dotenv = require('dotenv')

dotenv.config()

const {BASE_URL} = process.env

const verifyEmailAndSendMail = (email, verificationToken) =>{
    const mail = {
        to: email,
        subject: 'Verification successful',
        html: `<a href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`
    }

    return mail;
}

module.exports = verifyEmailAndSendMail