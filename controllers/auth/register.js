const {User} = require('../../models/user')

const {RequestError, sendMail, verifyEmailAndSendMail} = require("../../helpers")

const bcrypt = require('bcryptjs')

const gravatar = require('gravatar')

const {nanoid} = require('nanoid')


const register = async(req, res) => {
    const {name, email, password, subscription} = req.body;

    const user = await User.findOne({email});
        if(user){
            throw RequestError (409, "Email in use")
        }
    
    const avatarURL = gravatar.url(email)

    const hashPassword = await bcrypt.hash(password, 10)
    
    const verificationToken = nanoid(5)

    const result = await User.create({name, email, password: hashPassword, subscription, avatarURL, verificationToken})

    const mail = verifyEmailAndSendMail(email, verificationToken)

    await sendMail(mail)

    res.status(201).json({
        name: result.name,
        email: result.email,
        subscription: result.subscription,
        avatarURL: result.avatarURL,
        verificationToken: result.verificationToken,
    })
}

module.exports = register;
