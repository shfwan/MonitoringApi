import Joi from "joi"

const checkLoginPhoneNumber = Joi.object({
    phoneNumber: Joi.string().max(15).required()
})

const loginValidate = Joi.object({
    username: Joi.string().max(255).required(),
    password: Joi.string().max(100).required()
})

const registerValidate = Joi.object({
    username: Joi.string().max(255).required(),
    password: Joi.string().max(100).required()
})

const updatePasswordValidate = Joi.object({
    password: Joi.string().max(255).required()
})

export {
    checkLoginPhoneNumber,
    loginValidate,
    registerValidate,
    updatePasswordValidate
}