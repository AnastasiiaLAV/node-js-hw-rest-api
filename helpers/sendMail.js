const sgMail = require('@sendgrid/mail')

const dotenv = require('dotenv')

dotenv.config()

const {SENDGRID_API_KEY} = process.env

sgMail.setApiKey(SENDGRID_API_KEY)


const sendMail = async(data)=>{
    const mail = {...data, from: "lav21051991@gmail.com"};
    await sgMail.send(mail);
    return true;

}

module.exports = sendMail
