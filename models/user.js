const {Schema, model} = require('mongoose')

const {handlerSaveError} = require('../helpers')

const Joi = require('joi')


const patternEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: patternEmail,
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
    },

    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },

    token: {
        type: String,
        default: "",
    },

    avatarURL: {
        type: String,
        required: true,
    },
    
    verify: {
        type: Boolean,
        default: false,
    },

    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },

}, {versionKey:false, timeseries:true})

userSchema.post("save", handlerSaveError)

const User = model("user", userSchema)


const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(patternEmail).required(),
    password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().pattern(patternEmail).required(),
    password: Joi.string().min(6).required(),
})

const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const verifyEmailSchema = Joi.object({
    email: Joi.string().pattern(patternEmail).required(),
});

const schemas = {
    registerSchema,
    loginSchema,
    subscriptionSchema,
    verifyEmailSchema
}

module.exports ={
    schemas, 
    User,
}
