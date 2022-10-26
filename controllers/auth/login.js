const {User} = require('../../models/user')

const {RequestError} = require("../../helpers")

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const {SECRET_KEY} = process.env


const login = async(req, res) =>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    const passwordCompare = await bcrypt.compare(password, user.password)
        if(!user || !passwordCompare){
            throw RequestError (401, "Email or password wrong")
        }

    const payload = {
            id: user._id
        }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn:"1h"})
    
    res.json({
        status: "success",
        code: 200,
        data:{
            token
        }
    })
}

module.exports = login