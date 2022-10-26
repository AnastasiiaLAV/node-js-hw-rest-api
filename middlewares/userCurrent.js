const {User} = require('../models/user')

const {RequestError} = require("../helpers")

const jwt = require('jsonwebtoken')

const {SECRET_KEY} = process.env

const userCurrent = async(req, res, next) =>{
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ")
        if (bearer !== "Bearer"){
            throw new RequestError(401, "Not authorized")
        }

    try {
        const {_id} = jwt.verify(token, SECRET_KEY)
        const user = await User.findById(_id)
            if (!user){
                throw new RequestError(401, "Not authorized")
            }
        req.user = user
        next()
    } catch (error) {
        // throw new RequestError(401, "Not authorized")
        if(error.message === "Invalid sugnature"){
            error.status = 401;
        }
        next (error);
    }
}


module.exports = userCurrent