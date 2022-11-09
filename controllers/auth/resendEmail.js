const {User} = require('../../models/user')

const {RequestError, sendMail, verifyEmailAndSendMail} = require("../../helpers")



const resendEmail = async(req, res)=>{
    const {email} = req.body

    const user = await User.findOne({email})

    if(!user){
        throw RequestError(404)
    }

    if(user.verify){
        throw RequestError(400, "Verification has already been passed")
    }

    if(!email){
        throw RequestError(400, "Missing required field email")
    }

    const mail = verifyEmailAndSendMail(email, user.verificationToken)

    await sendMail(mail)

    res.json({
        message: "Verification email sent"
    })
}

module.exports = resendEmail