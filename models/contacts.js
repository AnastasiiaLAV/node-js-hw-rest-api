const {Schema, model} = require('mongoose')
const {handlerSaveError} = require('../helpers')
const Joi = require('joi')


const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
  },

  phone: {
    type: String,
    required: [true, "Set phone for contact"],
    unique: true,
  },

  favorite: {
    type: Boolean,
    default: false,
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }

}, {versionKey: false, timestamps: true}) 

contactSchema.post("save", handlerSaveError)


const addSchema = Joi.object({
  name: Joi.string().min(2).alphanum().required(),
  email: Joi.string().trim().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
})

const updateSchema = Joi.object({
  name: Joi.string(),
  email:Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
}).min(1)

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});


const schemas ={
    addSchema,
    updateSchema,
    updateFavoriteSchema
}

const Contact = model("contact", contactSchema)

module.exports = {
  Contact,
  schemas
};