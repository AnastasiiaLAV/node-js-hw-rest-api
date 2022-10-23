const {User} = require('../../models/user')

const {RequestError} = require("../../helpers")

const bcrypt = require('bcryptjs')


const login = async(req, res) =>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw RequestError (401, "Email or password wrong")
    }
    const passwordCompare = await bcrypt.compare(password, user.password)
    if(!passwordCompare){
        throw RequestError (401, "Email or password wrong")
    }
    const token = "1234tgd.34fsdf.4232"
    res.json({token})
}

module.exports = {
    login
}